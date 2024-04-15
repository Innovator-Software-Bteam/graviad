import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {Customer} from "../models/auth/auth.model";
import {CustomerManager} from "../models/auth/authManager.model";
import path from "path";

export const configPassport = () => {
    // Local Strategy
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const customer = await Customer.findOne({
                where: {email}
            });
            if (!customer) {
                return done(null, false, {message: 'Customer not found'});
            }
            if (!await CustomerManager.validatorPassword(customer, password)) {
                return done(null, false, {message: 'Password is incorrect'});
            }
            return done(null, customer);
        } catch (error) {
            return done(error);
        }
    }));

    // Google Strategy
    passport.use(new GoogleStrategy({
            clientID: "GOOGLE_CLIENT_ID",
            clientSecret: "GOOGLE_CLIENT_SECRET",
            callbackURL: path.join(process.env.GRAVIAD_SERVER_HOST as any, "auth/google/callback"),
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    ));

    // Facebook Strategy
    passport.use(new FacebookStrategy({
            clientID: "FACEBOOK_APP_ID",
            clientSecret: "FACEBOOK_APP_SECRET",
            callbackURL: path.join(process.env.GRAVIAD_SERVER_HOST as any, "auth/facebook/callback"),
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    ));

    // Serialize and Deserialize
    passport.serializeUser((customer: any, done) => {
        done(null, customer.id);
    });
    passport.deserializeUser(async (id: number, done) => {
        try {
            const customer = await Customer.findByPk(id);
            if (!customer) {
                return done(null, false);
            }
            return done(null, customer);
        } catch (error) {
            return done(error);
        }
    });

}