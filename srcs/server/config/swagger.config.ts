// Config swagger.
import {config} from "dotenv-flow";

config({node_env: process.env.NODE_ENV});
export const configSwagger = () => {
    const swaggerJsdoc = require("swagger-jsdoc");
    const swaggerUi = require("swagger-ui-express");
    const swaggerDocument = require("../swagger.yaml");
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Graviad API Documentation",
                version: "1.0.0",
                description: "A simple express library for Graviad API",
            },
            servers: [
                {
                    url: process.env.GRAVIAD_SERVER_HOST + ":" + process.env.GRAVIAD_SERVER_PORT,
                },
            ],
        },
        apis: ["./src/routes/*.ts"],
    };
    const specs = swaggerJsdoc(options);
    return [swaggerUi.serve, swaggerUi.setup(swaggerDocument,specs)];
}