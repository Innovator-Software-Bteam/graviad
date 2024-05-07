/**
 * @file auth.d.ts
 * @description Auth interface, describing state of auth action.
 * @module Authentication
 * @version 0.0.1
 */

export declare enum AuthMessage {
    LOGIN_SUCCESS = 'Login successfully',
    LOGIN_FAILED = 'Login failed',
    LOGOUT_SUCCESS = 'Logout successfully',
    SIGNUP_SUCCESS = 'Signup successfully',
    SIGNUP_FAILED = 'Signup failed',
}

