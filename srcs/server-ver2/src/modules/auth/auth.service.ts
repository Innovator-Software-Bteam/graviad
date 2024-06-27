import {ForbiddenException, forwardRef, Inject, Injectable, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {PassportSerializer} from "@nestjs/passport";
import {UserService} from "@app/modules/user";
import {User} from "@app/modules/user/entities";
import {AuthMessage, IAuthAction, TAuthResponse} from "@app/modules/auth/auth.interface";

@Injectable()
export class AuthService implements IAuthAction {
    constructor() {
    }

    login(@Req() req: Request): TAuthResponse {
        const status = req.isAuthenticated();
        if (status) {
            return {
                message: AuthMessage.LOGIN_SUCCESS,
                user: req.user,
                status: status
            }
        } else {
            throw new ForbiddenException({
                message: AuthMessage.LOGIN_FAILED,
                status: status
            });
        }
    }

    logout(req: Request, res: Response): void {
        try {

            req.logout(done => {
            });
            req.session.destroy((err) => {
                if (err) {
                }
                res.redirect('/');
            });
        } catch (e) {
        }

    }
}
    @Injectable()
    export
    class
    SessionSerializer
    extends
    PassportSerializer {
    constructor(
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService
    ) {
        super();
    }

    serializeUser(user: any, done: Function): any {
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function): Promise<any> {
        done(null, payload);
    }
}