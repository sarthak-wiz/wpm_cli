import express from 'express';
import Test from '../db/models/Test.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const stats = await Test.aggregate([
      { $match: { user: decoded.id } },
      { $group: {
          _id: null,
          averageWPM: { $avg: '$wpm' },
          bestWPM: { $max: '$wpm' },
          totalTests: { $sum: 1 },
          averageAccuracy: { $avg: '$accuracy' }
        }
      }
    ]);

    if (stats.length === 0) {
      return res.json({ message: 'No tests completed yet' });
    }

    res.json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;