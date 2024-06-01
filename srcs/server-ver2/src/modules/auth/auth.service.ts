import {forwardRef, Inject, Injectable, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {PassportSerializer} from "@nestjs/passport";
import {UserService} from "@app/modules/user";
import {User} from "@app/modules/user/entities";

@Injectable()
export class AuthService {
    constructor() {
    }

    async login(@Req() req: Request, @Res() res: Response) {
        if (!req.user) {
            return {
                message: 'No user from google',
                user: null
            }
        }
        return {
            message: 'User from google',
            user: req.user
        }
    }

    async logout(@Req() req: Request, @Res() res: Response, done: any) {
        req.logout(done);
        res.redirect('http://localhost:8000/auth/logout/success');
    }
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService
    ) {
        super();
    }

    // serializeUser(user: User, done: (err: Error, user: User) => void) {
    //     console.log('serializeUser');
    //     done(null, user);
    // }
    //
    // async deserializeUser(user: User, done: (err: Error, user: User) => void) {
    //     console.log('deserializeUser');
    //     const userDb = await this.userService.finOneByEmail(user.email);
    //     done(null, userDb);
    // }

    serializeUser(user: any, done: Function): any {
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function): Promise<any> {
        done(null, payload);
    }
}