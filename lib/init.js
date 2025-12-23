const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const createStructure = require('./structure');
const copyTemplates = require('./templates');

module.exports = async function init(projectName) {
    const root = path.join(process.cwd(), projectName);

    if (fs.existsSync(root)) {
        console.log('❌ Folder already exists');
        process.exit(1);
    }

    fs.mkdirSync(root);
    process.chdir(root);

    console.log('📁 Creating project...');
    createStructure();

    console.log('📄 Copying templates...');
    copyTemplates();

    try {
        console.log('📦 Installing dependencies...');
        execSync('npm install', {
            cwd: root,
            stdio: 'inherit'
        });
    } catch (err) {
        console.error('\n❌ npm install failed');
        console.error('👉 This is usually due to npm permission issues');
        console.error('👉 Run this once and retry:\n');
        console.error('   sudo chown -R 501:20 "$HOME/.npm"\n');
        process.exit(1);
    }

    console.log('✅ Done!');
    console.log(`👉 cd ${projectName} && npm run dev`);
};
