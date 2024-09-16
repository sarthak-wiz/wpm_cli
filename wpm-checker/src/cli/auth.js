import inquirer from 'inquirer';
import { generateToken } from '../utils/jwt.js';
import User from '../db/models/User.js';
import connectDB from '../db/connect.js';

export async function login() {
  await connectDB();

  const { username, password } = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:',
    },
  ]);

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    console.log('Invalid credentials');
    return null;
  }

  return generateToken(user._id);
}

export async function register() {
  await connectDB();

  const { username, password } = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Choose a username:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Choose a password:',
    },
  ]);

  try {
    const user = new User({ username, password });
    await user.save();
    return generateToken(user._id);
  } catch (error) {
    console.log('Registration failed:', error.message);
    return null;
  }
}