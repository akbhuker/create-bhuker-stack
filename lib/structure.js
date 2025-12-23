const fs = require('fs');

module.exports = function createStructure() {
    const folders = [
        'src/config',
        'src/routes',
        'src/controllers',
        'src/models',
        'src/services',
        'src/middlewares',
        'src/queues',
        'src/workers',
        'src/utils'
    ];

    folders.forEach(dir => fs.mkdirSync(dir, { recursive: true }));
};
