import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Profile, Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import path from "path";
import {serverURL} from "./graviad.config";
import {User} from "../models/auth/auth.model";

export const configPassport = () => {
    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, async (req,email, password, done) => {
        try {
            console.log(email, password);
            const user = await User.findOne({where: {email}});
            if (user) {
                const isValid = user.login(password);
                if (!isValid) {
                    return done(null, false);
                }
                return done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    // Google Strategy
    passport.use(new GoogleStrategy({
            clientID: process.env.GRAVIAD_GOOGLE_CLIENT_ID as any,
            clientSecret: process.env.GRAVIAD_GOOGLE_CLIENT_SECRET as any,
            callbackURL: '/auth/google/callback',
        },
        async function (accessToken, refreshToken, profile: any, done) {
            const {id, username, name, emails} = profile;
            await User.findOrCreate({
                where: {
                    email: emails[0].value
                },
                defaults: {
                    username: username || emails[0].value,
                    firstName: name.familyName,
                    lastName: name.givenName,
                    password: id
                }
            })
                .then(([user, created]) => {
                    return done(null, user);
                })
                .catch((error) => {
                    return done(error);
                });
        }));

    // Facebook Strategy
    passport.use(new FacebookStrategy({
            clientID: "FACEBOOK_APP_ID",
            clientSecret: "FACEBOOK_APP_SECRET",
            callbackURL: path.join(process.env.GRAVIAD_SERVER_HOST as any, "auth/facebook/callback"),
        },
        async function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }));

    // Serialize and Deserialize
    passport.serializeUser(function (user, done) {
        return done(null, user);
    });
    passport.deserializeUser(async (user: any, done) => {
        return done(null, user);
    });

}