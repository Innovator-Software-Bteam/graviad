import {registerAs} from "@nestjs/config";
import * as url from "url";

export default registerAs('graviad', () => ({
    server: {
        url: new URL(url.format({
            hostname: process.env.GRAVIAD_SERVER_HOST,
            port: process.env.GRAVIAD_SERVER_PORT,
            protocol: process.env.GRAVIAD_SERVER_SCHEMA,
        }))
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
