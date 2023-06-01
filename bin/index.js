#!/usr/bin/env node

"use strict";

const chalk = require('chalk');
const boxen = require('boxen');
const inquirer = require('inquirer');
const data = require('../data/data.json');

function showResume() {
    console.log(chalk.blue('Hi, I\'m Tanay 👋'));
    handleResume();
}

function workExperience() {
    data['🧳 Work Experience'].forEach(exp => {
        console.log(`${chalk.blue.bold(exp.Position)} - ${chalk.blue(exp.Company)}`);
        console.log(`${chalk.grey(exp.Start + ' - ' + exp.End)}`);
        console.log('');
    });
}

function education() {
    data['🎓 Education'].forEach(edu => {
        console.log(`${chalk.blue.bold(edu.Degree)}`);
        console.log(`${chalk.blue(edu.School)}`);
        console.log(`${chalk.grey(edu.Start + ' - ' + edu.End)}`);
        console.log('');
    });
}

function certifications() {
    data['🧪 Certifications'].forEach(certi => {
        console.log(`${chalk.blue.bold(certi.Name)}`);
        console.log(`${chalk.blue(certi.Organization + ' | ' + certi['Issue Date'])}`);
        console.log(`${chalk.grey('Credential ID: ' + (certi.ID || 'N/A'))}`);
        console.log(`${chalk.grey('Link: ')}${chalk.grey.underline(certi.URL)}`)
        console.log('');
    });
}

function publications() {
    data['📚 Publications'].forEach(pub => {
        console.log(`${chalk.blue.bold(pub.Title)}`);
        console.log(`${chalk.blue(pub['Description'])}`);
        console.log(`${chalk.grey(pub.Publisher + ' | ' + pub['Publication Date'])}`);
        console.log(`${chalk.grey('ISBN: ' + pub.ISBN)}`);
        console.log(`${chalk.grey('Link: ')}${chalk.grey.underline(pub.URL)}`);
        console.log('');
    });
}

function socialLinks() {
    for (const [key, value] of Object.entries(data['🙌 Social Links'])) {
        console.log(`${chalk.blue.bold(key)}: ${chalk.blue.underline(value)}`);
    }
    console.log('');
}

function bye() {
    console.log(chalk.blue('Thanks for stopping by! Have a nice one ✨'));
}

function handleResume() {
    console.log('');
    inquirer
        .prompt({
            name: "resumeOptions",
            message: "What would you like to know about me?",
            type: "list",
            choices: [
                ...Object.keys(data),
                '👋 Bye'
            ]
        })
        .then((choice) => {
            console.log();
            switch (choice.resumeOptions) {
                case '🧳 Work Experience':
                    workExperience();
                    break;
                case '🎓 Education':
                    education();
                    break;
                case '🧪 Certifications':
                    certifications();
                    break;
                case '📚 Publications':
                    publications();
                    break;
                case '🙌 Social Links':
                    socialLinks();
                    break;
                case '👋 Bye':
                    bye();
                    return;
            }
            inquirer.prompt({
                name: "exitBack",
                message: "Go back or exit?",
                type: "list",
                choices: [
                    "⏪ Back",
                    "👋 Bye"
                ]
            })
            .then(choice => {
                if (choice.exitBack == "👋 Bye") {
                    console.log('');
                    bye();
                    return;
                } else {
                    handleResume();
                }
            })
        })
        .catch((error) => {
            console.log(error)
        })
}

showResume();
