import arg from 'arg';
import inquirer from 'inquirer';

import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '-g': '--git',
            '-y': '--yes',
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        directoryName: args._[0],
    };
}

async function missingOptions(options) {
    const defaultDirectoryName = 'my-great-app';
    if (options.skipPrompts) {
        return {
            ...options,
            directoryName: defaultDirectoryName,
        };
    }

    const questions = [];
    if (!options.directoryName) {
        questions.push({
            type: 'input',
            name: 'directoryName',
            message: "What's your project name?",
            default: defaultDirectoryName,
        });
    }
    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repository?',
            default: false,
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        git: options.git || answers.git,
        directoryName: options.directoryName || answers.directoryName,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await missingOptions(options);
    await createProject(options);
}
