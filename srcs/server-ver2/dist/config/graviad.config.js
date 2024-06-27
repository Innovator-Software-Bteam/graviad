"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const url = __importStar(require("url"));
exports.default = (0, config_1.registerAs)('graviad', () => ({
    server: {
        url: new URL(url.format({
            hostname: process.env.GRAVIAD_SERVER_HOST,
            port: process.env.GRAVIAD_SERVER_PORT,
            protocol: process.env.GRAVIAD_SERVER_SCHEMA,
        })),
    },
    client: {
        url: new URL(url.format({
            hostname: process.env.GRAVIAD_CLIENT_HOST,
            port: process.env.GRAVIAD_CLIENT_PORT,
            protocol: process.env.GRAVIAD_CLIENT_SCHEMA,
        }))
    },
    google: {
        clientId: process.env.GRAVIAD_GOOGLE_CLIENT_ID,
        clientSecret: process.env.GRAVIAD_GOOGLE_CLIENT_SECRET,
        callbackUrl: new URL(url.format({
            hostname: process.env.GRAVIAD_SERVER_HOST,
            port: process.env.GRAVIAD_SERVER_PORT,
            protocol: process.env.GRAVIAD_SERVER_SCHEMA,
            pathname: process.env.GRAVIAD_GOOGLE_CALLBACK_PATH,
        }))
    },
    facebook: {
        clientId: process.env.GRAVIAD_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.GRAVIAD_FACEBOOK_CLIENT_SECRET,
        callbackUrl: url.format({
            hostname: process.env.GRAVIAD_SERVER_HOST,
            port: process.env.GRAVIAD_SERVER_PORT,
            protocol: process.env.GRAVIAD_SERVER_SCHEMA,
            pathname: process.env.GRAVIAD_FACEBOOK_CALLBACK_PATH,
        }),
    }
}));
//# sourceMappingURL=graviad.config.js.map