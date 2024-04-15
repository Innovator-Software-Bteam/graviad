// This module exports paths, names, and other metadata that is referenced
// throughout the build.

import path from "path";

const rootPath = path.join(__dirname, '..');
const buildPath = path.join(__dirname, 'build');

const appMetaData = require(path.join(rootPath, 'package.json'));

const version = appMetaData.version;
const name = appMetaData.name;