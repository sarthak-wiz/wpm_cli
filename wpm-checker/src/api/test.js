import express from 'express';
import Test from '../db/models/Test.js';
import TextSource from '../db/models/TextSource.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

// Existing route for starting a test
router.post('/start', async (req, res) => {
  try {
    const { difficulty } = req.body;
    const textSource = await TextSource.findOne({ difficulty, isActive: true }).sort({ timesUsed: 1 });
    
    if (!textSource) {
      return res.status(404).json({ message: 'No text available for this difficulty' });
    }

    res.json({ textSourceId: textSource._id, text: textSource.text });
  } catch (error) {
    console.error('Error starting test:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Updated route for submitting a test
router.post('/submit', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { wpm, accuracy, difficulty, textSourceId, duration, mistakes } = req.body;
    
    const test = new Test({
      user: decoded.id,
      wpm,
      accuracy,
      difficulty,
      textSource: textSourceId,
      duration,
      mistakes
    });

    await test.save();

    // Increment the timesUsed counter for the text source
    await TextSource.findByIdAndUpdate(textSourceId, { $inc: { timesUsed: 1 } });

    res.status(201).json({ message: 'Test result saved successfully' });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;