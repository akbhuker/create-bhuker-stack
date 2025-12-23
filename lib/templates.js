const fs = require('fs');
const path = require('path');

module.exports = function copyTemplates() {
    const templateDir = path.join(__dirname, '../templates/basic');
    const targetDir = process.cwd();

    copy(templateDir, targetDir);
};

function copy(src, dest) {
    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        if (fs.statSync(srcPath).isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copy(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
}
