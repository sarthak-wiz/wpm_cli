import inquirer from 'inquirer';
import axios from 'axios';
import chalk from 'chalk';
import { calculateWPM, calculateAccuracy, countMistakes } from '../utils/wpmCalculator.js';
import { generateText } from '../utils/textGenerator.js';

const API_URL = process.env.API_URL || 'http://localhost:3000/api';

export async function startTest(token) {
  try {
    const { difficulty } = await inquirer.prompt([
      {
        type: 'list',
        name: 'difficulty',
        message: 'Select difficulty:',
        choices: ['Easy', 'Medium', 'Hard']
      }
    ]);

    const response = await axios.post(`${API_URL}/test/start`, { difficulty }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { textSourceId, text } = response.data;

    console.log(chalk.cyan('\nType the following text:'));
    console.log(chalk.yellow(text));
    console.log(chalk.cyan('\nPress Enter to start. Type and press Enter when finished.'));

    const startTime = Date.now();
    const { userInput } = await inquirer.prompt([
      {
        type: 'input',
        name: 'userInput',
        message: ''
      }
    ]);
    const endTime = Date.now();

    const duration = (endTime - startTime) / 1000; // Convert to seconds
    const wpm = calculateWPM(text, userInput, duration);
    const accuracy = calculateAccuracy(text, userInput);
    const mistakes = countMistakes(text, userInput);

    console.log(chalk.green(`\nYour WPM: ${wpm}`));
    console.log(chalk.green(`Accuracy: ${accuracy}%`));

    // Submit test results
    await axios.post(`${API_URL}/test/submit`, {
      wpm,
      accuracy,
      difficulty,
      textSourceId,
      duration,
      mistakes
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log(chalk.green('Test result saved successfully!'));
  } catch (error) {
    console.error(chalk.red('Error:', error.response?.data?.message || error.message));
  }
}