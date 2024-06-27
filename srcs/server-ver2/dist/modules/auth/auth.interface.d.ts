/// <reference types="cookie-parser" />
import { Request, Response } from "express";
export interface IAuthAction {
    login(req: Request, res: Response): TAuthResponse;
    logout(req: Request, res: Response): void;
}
export type TAuthResponse = {
    message: string;
    user?: any;
    status?: boolean;
};
export declare enum AuthMessage {
    LOGIN_SUCCESS = "Login success",
    LOGIN_FAILED = "Login failed",
    LOGOUT_SUCCESS = "Logout success",
    LOGOUT_FAILED = "Logout failed",
    LOGIN_REQUIRED = "Login required",
    LOGOUT_REQUIRED = "Logout required",
    LOGIN_SUCCESS_REDIRECT = "Login success redirect",
    LOGIN_FAILED_REDIRECT = "Login failed redirect",
    LOGOUT_SUCCESS_REDIRECT = "Logout success redirect",
    LOGOUT_FAILED_REDIRECT = "Logout failed redirect"
}
