/**
 * This is a minimal script to publish your package to "npm".
 * This is meant to be used as-is or customize as you see fit.
 *
 * This script is executed on "dist/path/to/library" as "cwd" by default.
 *
 * You might need to authenticate with NPM before running this script.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import chalk from 'chalk';

import devkit from '@nrwl/devkit';
const { readCachedProjectGraph } = devkit;

function invariant(condition, message) {
  if (!condition) {
    console.error(chalk.bold.red(message));
    process.exit(1);
  }
}

// Executing publish script: node path/to/publish.mjs {name} --tag {tag}
// Default "tag" to "next" so we won't publish the "latest" tag by accident.
const [, , name, , tag = 'next'] = process.argv;

const graph = readCachedProjectGraph();
const project = graph.nodes[name];

invariant(project, `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`);

const outputPath = project.data?.targets?.build?.options?.outputPath;
invariant(
  outputPath,
  `Could not find "build.options.outputPath" of project "${name}". Is project.json configured  correctly?`
);

process.chdir(outputPath);

// Updating the version in "package.json" before publishing
// try {
//   const json = JSON.parse(readFileSync(`package.json`).toString());
//   const version = json.version.split('.');
//   json.version = `${version[0]}.${version[1]}.${(parseInt(version[2]) + 1).toString()}`;
//   writeFileSync(`package.json`, JSON.stringify(json, null, 2));
// } catch (e) {
//   console.error(chalk.bold.red(`Error reading package.json file from library build output.`));
// }

// Execute "npm publish" to publish
if (tag === 'latest') {
  execSync(`npm publish --access public`);
} else {
  execSync(`npm publish --access public --tag ${tag}`);
}
