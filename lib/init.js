const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ora = require('ora');
const chalk = require('chalk');

const createStructure = require('./structure');
const copyTemplates = require('./templates');

/* 🎲 Random jokes / tips */
const tips = [
    'Pro tip: Index your MongoDB collections 📚',
    'Pro tip: Never trust user input 😈',
    'Pro tip: Logs save lives 🧯',
    'Pro tip: Async bugs love silence 🤫',
    'Joke: It works on my machine 🤷‍♂️',
    'Joke: MongoDB schema is optional… until it isn’t 😅',
    'Joke: There are only 2 hard things in CS: naming & cache invalidation',
    'Pro tip: Use environment variables, not hardcoded secrets 🔐'
];

function randomTip() {
    return tips[Math.floor(Math.random() * tips.length)];
}

module.exports = async function init(projectName) {
    const root = path.join(process.cwd(), projectName);

    console.log('\n' + chalk.cyan.bold('🚀 Welcome to create-node-mongo-backend'));
    console.log(chalk.gray(`💡 ${randomTip()}\n`));

    if (fs.existsSync(root)) {
        console.log(chalk.red('🛑 Oops! That folder already exists.'));
        console.log(chalk.yellow('👉 Choose a different name or delete the existing folder.\n'));
        process.exit(1);
    }

    // Create project folder
    fs.mkdirSync(root);
    process.chdir(root);

    console.log(chalk.blue('📁 Creating project structure...'));
    createStructure();
    console.log(chalk.green('   ✔ Folders created\n'));

    console.log(chalk.blue('📄 Copying templates...'));
    copyTemplates();
    console.log(chalk.green('   ✔ Boilerplate ready (no copy-paste crimes committed)\n'));

    // Spinner for npm install
    const spinner = ora({
        text: '📦 Installing dependencies (this may take a moment)',
        spinner: 'dots'
    }).start();

    try {
        execSync('npm install', {
            cwd: root,
            stdio: 'ignore'
        });

        spinner.succeed('Dependencies installed successfully');
    } catch (err) {
        spinner.fail('Dependency installation failed');

        console.error('\n' + chalk.red('💥 npm had a small meltdown.'));
        console.error(chalk.yellow('👉 This is usually a permissions issue.\n'));
        console.error(chalk.cyan('🛠 Fix it once by running:\n'));
        console.error(chalk.white('   sudo chown -R 501:20 "$HOME/.npm"\n'));
        console.error(chalk.gray('Then rerun the command like nothing happened.\n'));

        process.exit(1);
    }

    console.log('\n' + chalk.green.bold('🎉 Your backend is ready!'));
    console.log(chalk.white('\n👉 Next steps:\n'));
    console.log(chalk.cyan(`   cd ${projectName}`));
    console.log(chalk.cyan('   cp .env.example .env'));
    console.log(chalk.cyan('   npm run dev\n'));

    console.log(chalk.magenta('🔥 Happy coding! May your APIs be fast and your bugs reproducible.\n'));
};
