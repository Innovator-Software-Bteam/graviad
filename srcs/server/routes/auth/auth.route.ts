import express from "express";
import passport from "passport";
import {User} from "../../models/auth/auth.model";
import {clientURL} from "../../config/graviad.config";
import {StatusCodes} from "http-status-codes";
import {AuthMessage} from "../../interfaces/auth.controller";

export const router = express.Router();
router.get('/login/success', (req, res) => {
    if (!req.isAuthenticated()) return;
    res.status(StatusCodes.OK).json({message: AuthMessage.LOGIN_SUCCESS, user: req.user});
});
router.get('/login/failed', (req, res) => {
    res.status(StatusCodes.UNAUTHORIZED).json({message: AuthMessage.LOGIN_FAILED});
});
router.post('logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
    res.status(StatusCodes.OK).json({message: AuthMessage.LOGOUT_SUCCESS});
});
router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.create({email, password});
    res.json(user);
    /**
     * TODO: Add OTP verification
     */
});
router.post('/graviad', passport.authenticate('local', {
    // successRedirect: '/',
    failureRedirect: '/auth/login/failed'
}), (req, res) => {
    res.status(StatusCodes.OK).json({message: AuthMessage.LOGIN_SUCCESS});
});

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google',
    {
        successRedirect: clientURL.toString(),
        failureRedirect: '/auth/login/failed'
    }
));


router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));
router.get('/facebook/callback', passport.authenticate('facebook'));

