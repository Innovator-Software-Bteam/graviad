/// <reference types="cookie-parser" />
import { Request, Response } from "express";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "@app/modules/user";
import { IAuthAction, TAuthResponse } from "@app/modules/auth/auth.interface";
export declare class AuthService implements IAuthAction {
    constructor();
    login(req: Request): TAuthResponse;
    logout(req: Request, res: Response): void;
}
export declare class SessionSerializer extends PassportSerializer {
    private readonly userService;
    constructor(userService: UserService);
    serializeUser(user: any, done: Function): any;
    deserializeUser(payload: any, done: Function): Promise<any>;
}
