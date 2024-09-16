import dotenv from 'dotenv';
dotenv.config();

import { startCLI } from './src/cli/index.js';
import connectDB from './src/db/connect.js';

connectDB();
startCLI();
