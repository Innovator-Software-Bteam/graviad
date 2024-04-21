import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {config} from "dotenv-flow";
import passport from 'passport';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import {configSequelize, localSequelize as sequelize} from "../config/database.config";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import {router as authRouter} from "../routes/auth/auth.route";
import {configPassport} from "../config/passport.config";
import {configSwagger} from "../config/swagger.config";

config({node_env: process.env.NODE_ENV});

const app = express();
const port = process.env.GRAVIAD_SERVER_PORT;

// Config
configPassport();
configSequelize();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', ...configSwagger());

const SequelizeStoreSession = SequelizeStore(session.Store);
app.use(session({   // Use express-session middleware
    secret: 'graviad_key_012345',
    resave: false,
    saveUninitialized: false,
    // store: new SequelizeStoreSession({
    //     db: sequelize,
    //     tableName: 'sessions',
    // }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
