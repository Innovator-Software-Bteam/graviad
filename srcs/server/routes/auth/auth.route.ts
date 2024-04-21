import express from "express";
import passport from "passport";
import {User} from "../../models/auth/auth.model";

export const router = express.Router();
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
});
router.post('logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
    res.json({message: 'Logout successfully'});
});
router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.create({email, password});
    res.json(user);
    /**
     * TODO: Add OTP verification
     */
});
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google'));


router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));
router.get('/facebook/callback', passport.authenticate('facebook'));

