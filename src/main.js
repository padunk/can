import fs from 'fs';
import chalk from 'chalk';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplate(options) {
    return copy(options.templateDirectory, options.targetDirectory, {
        clobber: false,
    });
}

async function gitInit(options) {
    const result = await execa('git', ['init'], {
        cwd: options.targetDirectory,
    });
    if (result.failed) {
        Promise.reject(new Error('Failed to initialize Git'));
    }
    return;
}

export async function createProject(options) {
    let opts = {
        ...options,
        targetDirectory: options.directoryName,
    };
    fs.mkdirSync(opts.directoryName);

    let currentFileUrl = import.meta.url;
    currentFileUrl = currentFileUrl.replace('file:///', '');

    const templateDir = path.resolve(currentFileUrl, '../../template');
    opts.templateDirectory = templateDir;

    try {
        await access(templateDir, fs.constants.R_OK);
    } catch (error) {
        console.error('Invalid template', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    const tasks = new Listr([
        {
            title: 'Copy template files',
            task: () => copyTemplate(options),
        },
        {
            title: 'Initialize git',
            task: () => gitInit(options),
            enabled: () => options.git,
        },
    ]);

    await tasks.run();

    console.log('%s project ready', chalk.green.bold('DONE'));
    return true;
}
