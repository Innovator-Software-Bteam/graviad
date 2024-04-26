// This module exports paths, names, and other metadata that is referenced
// throughout the scripts.

import path from "path";
import {URL} from "url";

// URL of the server
const schemeServer = process.env.GRAVIAD_SERVER_SCHEME;
const hostServer = process.env.GRAVIAD_SERVER_HOST;
const portServer = process.env.GRAVIAD_SERVER_PORT;
export const serverURL = new URL(`${schemeServer}://${hostServer}:${portServer}`);

// URL of client
const schemeClient = process.env.GRAVIAD_CLIENT_SCHEME;
const hostClient = process.env.GRAVIAD_CLIENT_HOST;
const portClient = process.env.GRAVIAD_CLIENT_PORT;
export const clientURL = new URL(`${schemeClient}://${hostClient}:${portClient}`);

const rootPath = path.join(__dirname, '..');
const buildPath = path.join(__dirname, 'build');

// const appMetaData = require(path.join(rootPath, 'package.json'));
//
// const version = appMetaData.version;
// const name = appMetaData.name;