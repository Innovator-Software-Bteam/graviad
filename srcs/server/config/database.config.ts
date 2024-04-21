// Config sequelize
import {Sequelize} from "sequelize";
import {config} from "dotenv-flow";

config({node_env: process.env.NODE_ENV});

export const localSequelize = new Sequelize({
    dialect: process.env.GRAVIAD_DATABASE_DIALECT as any,
    host: process.env.GRAVIAD_DATABASE_HOST,
    port: Number(process.env.GRAVIAD_DATABASE_PORT),
    username: process.env.GRAVIAD_DATABASE_USERNAME,
    password: process.env.GRAVIAD_DATABASE_PASSWORD,
    database: process.env.GRAVIAD_DATABASE_NAME,
});
export const configSequelize = () => {

};