import express from 'express';
import User from '../db/models/User.js';
import { generateToken } from '../utils/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error: error.message });
  }
});

export default router;