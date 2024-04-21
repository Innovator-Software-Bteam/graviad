// This module exports paths, names, and other metadata that is referenced
// throughout the scripts.

import path from "path";
import {URL} from "url";

// URL of the server
const scheme = process.env.GRAVIAD_SERVER_SCHEME;
const host = process.env.GRAVIAD_SERVER_HOST;
const port = process.env.GRAVIAD_SERVER_PORT;
export const serverURL = new URL(`${scheme}://${host}:${port}`);

const rootPath = path.join(__dirname, '..');
const buildPath = path.join(__dirname, 'build');

// const appMetaData = require(path.join(rootPath, 'package.json'));
//
// const version = appMetaData.version;
// const name = appMetaData.name;