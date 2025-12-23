#!/usr/bin/env node

const { Command } = require('commander');
const init = require('../lib/init');
const pkg = require('../package.json');

const program = new Command();

program
    .name('create-node-mongo-backend')
    .version(pkg.version)
    .argument('<project-name>', 'Name of the project')
    .description('Scaffold a production-ready Node.js + MongoDB backend')
    .action(init);

program.parse();
