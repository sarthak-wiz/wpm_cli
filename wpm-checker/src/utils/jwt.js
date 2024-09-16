import jwt from 'jsonwebtoken';
import config from '../config.js';

export function generateToken(userId) {
  return jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '1d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
}