import chalk from 'chalk';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000/api';

export async function viewStats(token) {
  try {
    const response = await axios.get(`${API_URL}/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(chalk.yellow('Personal Stats:'));
    console.log(chalk.cyan(`Average WPM: ${response.data.averageWPM}`));
    console.log(chalk.cyan(`Best WPM: ${response.data.bestWPM}`));
    console.log(chalk.cyan(`Total Tests: ${response.data.totalTests}`));
    console.log(chalk.cyan(`Average Accuracy: ${response.data.averageAccuracy}%`));
  } catch (error) {
    console.error(chalk.red('Error:', error.response?.data?.message || error.message));
  }
}