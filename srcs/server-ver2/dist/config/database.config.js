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
const process = __importStar(require("process"));
exports.default = (0, config_1.registerAs)('database', () => ({
    host: process.env.GRAVIAD_DATABASE_HOST,
    port: parseInt(process.env.GRAVIAD_DATABASE_PORT, 10),
    username: process.env.GRAVIAD_DATABASE_USERNAME,
    password: process.env.GRAVIAD_DATABASE_PASSWORD,
    database: process.env.GRAVIAD_DATABASE_NAME,
    type: process.env.GRAVIAD_DATABASE_ORM_TYPE,
    synchronize: process.env.GRAVIAD_DATABASE_ORM_SYNCHRONIZE === 'true',
    logging: process.env.GRAVIAD_DATABASE_ORM_LOGGING === 'true',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
}));
//# sourceMappingURL=database.config.js.map