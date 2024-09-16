import jwt from 'jsonwebtoken';
import config from '../config.js';

export function generateToken(user) {
  return jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
}