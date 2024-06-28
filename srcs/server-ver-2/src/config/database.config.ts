import { registerAs } from '@nestjs/config';
import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as process from "process";

export default registerAs('database', (): TypeOrmModuleOptions => ({
    host: process.env.GRAVIAD_DATABASE_HOST,
    port: parseInt(process.env.GRAVIAD_DATABASE_PORT, 10),
    username: process.env.GRAVIAD_DATABASE_USERNAME,
    password: process.env.GRAVIAD_DATABASE_PASSWORD,
    database: process.env.GRAVIAD_DATABASE_NAME,
    ssl: process.env.GRAVIAD_DATABASE_SSL === 'true',

    type: process.env.GRAVIAD_DATABASE_ORM_TYPE as any,
    synchronize: process.env.GRAVIAD_DATABASE_ORM_SYNCHRONIZE === 'true',
    logging: process.env.GRAVIAD_DATABASE_ORM_LOGGING === 'true',

    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
}));
