import express from 'express';
import connectDB from '../db/connect.js'; // Corrected import
import authRoutes from './auth.js';
import testRoutes from './test.js';
import statsRoutes from './stats.js';
import leaderboardRoutes from './leaderboard.js';
import config from '../config.js';

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}).catch(error => {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
});