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

    const leaderboard = await Test.aggregate([
      { $group: { 
          _id: '$user', 
          bestWPM: { $max: '$wpm' },
          averageWPM: { $avg: '$wpm' },
          testsCompleted: { $sum: 1 }
        }
      },
      { $sort: { bestWPM: -1 } },
      { $limit: 10 },
      { $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $project: {
          username: { $arrayElemAt: ['$userDetails.username', 0] },
          bestWPM: 1,
          averageWPM: 1,
          testsCompleted: 1
        }
      }
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;