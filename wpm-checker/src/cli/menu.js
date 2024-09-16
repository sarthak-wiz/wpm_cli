import inquirer from 'inquirer';
import chalk from 'chalk';
import { startTest } from './test.js';
import { viewStats } from './stats.js';
import { viewLeaderboard } from './leaderboard.js';
import { login, register } from './auth.js';

let token = null;

async function authenticateUser() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: ['Login', 'Register', 'Continue as Guest']
    }
  ]);

  if (action === 'Login') {
    token = await login();
  } else if (action === 'Register') {
    token = await register();
  }

  if (token) {
    console.log(chalk.green('Authentication successful!'));
  }
}

export async function mainMenu() {
  if (!token) {
    await authenticateUser();
  }

  while (true) {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'Start New Test',
          'View Personal Stats',
          'View Leaderboard',
          'Logout',
          'Exit'
        ]
      }
    ]);

    switch (choice) {
      case 'Start New Test':
        await startTest(token);
        break;
      case 'View Personal Stats':
        await viewStats(token);
        break;
      case 'View Leaderboard':
        await viewLeaderboard(token);
        break;
      case 'Logout':
        token = null;
        console.log(chalk.yellow('Logged out successfully.'));
        return mainMenu();
      case 'Exit':
        console.log(chalk.green('Thank you for using WPM Checker. Goodbye!'));
        process.exit(0);
    }
  }
}