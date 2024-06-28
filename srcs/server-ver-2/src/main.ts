import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';
import passport from "passport";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('GRAVIAD_SERVER_PORT');
    const sessionCookieSecure = configService.get('GRAVIAD_SESSION_COOKIE_SECURE');

    app.use(cookieParser());
    app.use(cors({
        origin: configService.get('GRAVIAD_CLIENT_URL'),
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Type', 'Authorization'],
    }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    app.use(session({
        name: 'SID',
        secret: 'secret',
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60, // 1 hour
            secure: true,
        },
        saveUninitialized: false,
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.useGlobalPipes(new ValidationPipe({stopAtFirstError: true}));
    // app.useGlobalFilters(
    //     new AllExceptionsFilter(),
    // );
    await app.listen(port);
}

bootstrap();