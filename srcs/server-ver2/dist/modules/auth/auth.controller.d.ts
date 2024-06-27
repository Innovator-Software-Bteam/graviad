/// <reference types="cookie-parser" />
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { TGraviadConfig } from "@app/config";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly grvdConfig;
    private readonly authService;
    private readonly server;
    private readonly client;
    constructor(grvdConfig: ConfigService<TGraviadConfig>, authService: AuthService);
    index(): Promise<{
        message: string;
    }>;
    login(req: Request): Promise<import("./auth.interface").TAuthResponse>;
    logout(req: Request, res: Response, next: any): Promise<{
        url: string;
    }>;
    googleAuth(req: Request): Promise<{
        message: string;
    }>;
    googleAuthRedirect(req: Request): {
        url: string;
    };
    facebookAuth(req: Request): Promise<{
        message: string;
    }>;
    facebookAuthRedirect(req: Request): {
        url: string;
    };
}
