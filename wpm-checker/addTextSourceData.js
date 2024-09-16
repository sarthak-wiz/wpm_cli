import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TextSource from './src/db/models/TextSource.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const addTextSourceData = async () => {
  await connectDB();

  const textSources = [
    {
      text: "The quick brown fox jumps over the lazy dog.",
      difficulty: "Easy",
      category: "General",
      author: "Unknown",
      source: "Custom",
      isActive: true,
    },
    {
      text: "A journey of a thousand miles begins with a single step.",
      difficulty: "Easy",
      category: "General",
      author: "Unknown",
      source: "Custom",
      isActive: true,
    },
    {
      text: "To be or not to be, that is the question.",
      difficulty: "Easy",
      category: "General",
      author: "Unknown",
      source: "Custom",
      isActive: true,
    },
    {
      text: "In the end, it's not the years in your life that count. It's the life in your years.",
      difficulty: "Medium",
      category: "General",
      author: "Unknown",
      source: "Custom",
      isActive: true,
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      difficulty: "Medium",
      category: "General",
      author: "Unknown",
      source: "Custom",
      isActive: true,
    },
    {
      text: "The only way to do great work is to love what you do.",
      difficulty: "Medium",
      category: "General",
      author: "Unknown",
      source: "Custom",
      isActive: true,
    },
    {
      text: "I am not a product of my circumstances. I am a product of my decisions.",
      difficulty: "Hard",
      category: "General",
      author: "Unknown",
      source: "Custom",
      isActive: true,
    },
    {
      text: "Strive not to be a success, but rather to be of value. That is the true measure of achievement.",
      difficulty: "Hard",
      category: "General",
      author: "Unknown",
      source: "Custom",
      isActive: true,
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams and work tirelessly to achieve them.",
      difficulty: "Hard",
      category: "General",
      author: "Unknown",
      source: "Custom",
      isActive: true,
    },
  ];

  await TextSource.insertMany(textSources);
  console.log('TextSource data added');
  mongoose.connection.close();
};

addTextSourceData();
