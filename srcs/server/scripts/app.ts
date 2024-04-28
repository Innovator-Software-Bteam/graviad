import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {config} from "dotenv-flow";
import passport from 'passport';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import {configSequelize} from "../config/database.config";

import {router as authRouter} from "../routes/auth/auth.route";
import {configPassport} from "../config/passport.config";
import {configSwagger} from "../config/swagger.config";


// Config
config({node_env: process.env.NODE_ENV});
configPassport();
configSequelize();

const app = express();
const port = process.env.GRAVIAD_SERVER_PORT;


// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', ...configSwagger());

app.use(session({   // Use express-session middleware
    secret: 'graviad_key_012345',
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});