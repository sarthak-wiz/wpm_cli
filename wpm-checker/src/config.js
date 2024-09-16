import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

export default {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 3000
};