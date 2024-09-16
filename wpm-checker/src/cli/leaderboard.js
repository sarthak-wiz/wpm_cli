import chalk from 'chalk';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000/api';

export async function viewLeaderboard(token) {
  try {
    const response = await axios.get(`${API_URL}/leaderboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(chalk.yellow('Leaderboard:'));
    response.data.forEach((entry, index) => {
      console.log(chalk.cyan(`${index + 1}. ${entry.username} - Best WPM: ${entry.bestWPM}, Average WPM: ${entry.averageWPM}, Tests Completed: ${entry.testsCompleted}`));
    });
  } catch (error) {
    console.error(chalk.red('Error:', error.response?.data?.message || error.message));
  }
}