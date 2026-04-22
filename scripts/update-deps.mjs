#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const defaultTarget = 'latest';

async function readJson(filePath) {
  const content = await readFile(filePath, 'utf8');
  return JSON.parse(content);
}

function getWorkspacePatterns(workspaces) {
  if (Array.isArray(workspaces)) {
    return workspaces;
  }

  if (workspaces && Array.isArray(workspaces.packages)) {
    return workspaces.packages;
  }

  throw new Error('Root package.json must define npm workspaces.');
}

function parseArgs(argv) {
  const options = {
    dryRun: false,
    target: defaultTarget,
    passthrough: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--dry-run' || arg === '--check') {
      options.dryRun = true;
      continue;
    }

    if (arg === '--target' || arg === '-t') {
      const value = argv[index + 1];

      if (!value) {
        throw new Error('Missing value for --target.');
      }

      options.target = value;
      index += 1;
      continue;
    }

    if (arg.startsWith('--target=')) {
      options.target = arg.slice('--target='.length);
      continue;
    }

    options.passthrough.push(arg);
  }

  return options;
}

function getCommandName(baseName) {
  return baseName;
}

function runCommand(command, args) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
    windowsHide: true,
  });

  if (result.error) {
    if (result.error.code === 'ENOENT') {
      throw new Error(
        `Unable to find ${command}. Run npm install in the repo root or install npm-check-updates globally.`
      );
    }

    throw result.error;
  }

  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status);
  }
}

async function pathExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function listDirectories(basePath) {
  const entries = await readdir(basePath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(basePath, entry.name));
}

async function expandWorkspaceSegment(basePaths, segment) {
  const nextMatches = [];

  for (const basePath of basePaths) {
    if (segment === '*') {
      nextMatches.push(...(await listDirectories(basePath)));
      continue;
    }

    const candidate = path.join(basePath, segment);

    if (await pathExists(candidate)) {
      nextMatches.push(candidate);
    }
  }

  return nextMatches;
}

async function expandWorkspacePattern(pattern) {
  const segments = pattern.split('/').filter(Boolean);
  let matches = [repoRoot];

  for (const segment of segments) {
    matches = await expandWorkspaceSegment(matches, segment);
  }

  return matches;
}

async function collectWorkspaceManifestPaths(rootPackageJson) {
  const patterns = getWorkspacePatterns(rootPackageJson.workspaces);
  const manifestPaths = new Set();

  for (const pattern of patterns) {
    const workspaceDirs = await expandWorkspacePattern(pattern);

    for (const workspaceDir of workspaceDirs) {
      const manifestPath = path.join(workspaceDir, 'package.json');

      if (await pathExists(manifestPath)) {
        manifestPaths.add(manifestPath);
      }
    }
  }

  return [...manifestPaths].sort((left, right) => left.localeCompare(right));
}

async function collectInternalPackageNames(manifestPaths) {
  const internalNames = [];

  for (const manifestPath of manifestPaths) {
    const manifest = await readJson(manifestPath);

    if (manifest.name) {
      internalNames.push(manifest.name);
    }
  }

  return internalNames.sort((left, right) => left.localeCompare(right));
}

async function main() {
  const rootManifestPath = path.join(repoRoot, 'package.json');
  const rootPackageJson = await readJson(rootManifestPath);
  const options = parseArgs(process.argv.slice(2));
  const workspaceManifestPaths = await collectWorkspaceManifestPaths(rootPackageJson);
  const manifestPaths = [rootManifestPath, ...workspaceManifestPaths];
  const internalPackageNames = await collectInternalPackageNames(workspaceManifestPaths);
  const rejectList = internalPackageNames.join(',');
  const npmCommand = getCommandName('npm');

  console.log(
    `Scanning ${manifestPaths.length} package.json files with target "${options.target}".`
  );

  if (internalPackageNames.length > 0) {
    console.log(`Skipping ${internalPackageNames.length} internal workspace packages.`);
  }

  for (const manifestPath of manifestPaths) {
    const relativeManifestPath = path.relative(repoRoot, manifestPath) || 'package.json';
    const ncuArgs = [
      '--packageFile',
      relativeManifestPath,
      '--install',
      'never',
      '--target',
      options.target,
    ];

    if (rejectList) {
      ncuArgs.push('--reject', rejectList);
    }

    if (!options.dryRun) {
      ncuArgs.push('--upgrade');
    }

    ncuArgs.push(...options.passthrough);

    console.log(`\n> ${relativeManifestPath}`);
    runCommand(npmCommand, ['exec', '--yes', 'npm-check-updates', '--', ...ncuArgs]);
  }

  if (options.dryRun) {
    console.log('\nDry run completed. No files were modified.');
    return;
  }

  console.log('\n> npm install');
  runCommand(npmCommand, ['install']);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
