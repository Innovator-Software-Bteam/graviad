import express from "express";
import passport from "passport";

export const router = express.Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login by local strategy
 *     tags:
 *       - Authentication
 *     description: Login by local strategy with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the customer
 *               password:
 *                 type: string
 *                 description: Password of the customer
 *     responses:
 *       200:
 *         description: Login successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user);
});

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Authenticate with Google
 *     tags:
 *       - Authentication
 *     description: Authenticate with Google account
 *     responses:
 *       '302':
 *         description: Redirect to Google authentication page
 *
 * /auth/google/callback:
 *   get:
 *     summary: Google authentication callback
 *     tags:
 *       - Authentication
 *     description: Callback endpoint after successful authentication with Google account
 *     responses:
 *       '302':
 *         description: Redirect to the main page of the application after successful authentication
 *       '401':
 *         description: Unauthorized
 */
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
});

/**
 * @swagger
 * /auth/facebook:
 *   get:
 *     summary: Authenticate with Facebook
 *     tags:
 *       - Authentication
 *     description: Authenticate with Facebook account
 *     responses:
 *       '302':
 *         description: Redirect to Facebook authentication page
 *
 * /auth/facebook/callback:
 *   get:
 *     summary: Facebook authentication callback
 *     tags:
 *       - Authentication
 *     description: Callback endpoint after successful authentication with Facebook account
 *     responses:
 *       '302':
 *         description: Redirect to the main page of the application after successful authentication
 *       '401':
 *         description: Unauthorized
 */
router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));
router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/');
});

