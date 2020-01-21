#!/usr/bin/env node
let argv = require('optimist')
    .usage(
        `
    Usage: $0 [-h] [-d directory_name]`
    )
    .options({
        d: {
            default: 'my-great-app',
        },
    })
    .describe({
        d: 'Your new app directory name like <my-great-app>',
        h: 'Display this help message',
    })
    .boolean(['d', 'h']).argv;

if (argv.h) {
    showHelp();
} else {
    createTemplate();
}

function createTemplate() {
    let module = require('./main');
    module.create();
}

function showHelp() {
    require('optimist').showHelp();
}
