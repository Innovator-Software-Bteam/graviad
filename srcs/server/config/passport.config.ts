import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Profile, Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import path from "path";
import {serverURL} from "../config";
import {User} from "../models/auth/auth.model";

export const configPassport = () => {
    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({where: {email}});
            if (!user) {
                const newUser = await User.create({
                    email,
                    password
                });
                return done(null, false);
            }
            const isValid = await user.login(password);
            if (!isValid) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    // Google Strategy
    passport.use(new GoogleStrategy({
            clientID: "751472948696-ksh3uiq6ftr8lvchm1j63on0n4q5kfkp.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: new URL("/auth/google/callback", serverURL).toString(),
        },
        async function (accessToken, refreshToken, profile: any, cb) {
            const {
                id,
                username,
                name,
                emails,
            } = profile;
            let user = await User.findOrCreate({
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
                .then(([user]) => {
                    console.log(user);
                    return cb(null, user);
                })
                .catch((error) => {
                    console.log(error);
                    return cb(error);
                });
            return cb(null, profile);
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
    passport.deserializeUser(async (id: string, done) => {
        return done(null, id);
    });

}