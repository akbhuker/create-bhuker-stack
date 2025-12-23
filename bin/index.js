#!/usr/bin/env node

const { Command } = require('commander');
const init = require('../lib/init');
const pkg = require('../package.json');

const program = new Command();

program
    .name('create-bhuker-stack')
    .version(pkg.version)
    .argument('<project-name>', 'Name of the project')
    .description('Create an industry-standard Node.js backend')
    .action(init);

program.parse();
