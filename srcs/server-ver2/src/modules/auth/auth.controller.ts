import {
    Controller,
    Get,
    UseGuards,
    Redirect,
    Post,
    Req,
    Res,
    Next,
    HttpStatus, Inject
} from "@nestjs/common";
import {FacebookOAuthGuard, GoogleOAuthGuard, AuthGuard} from "@app/modules/auth/gaurds";
import {NextFunction, Request, Response} from "express";
import {ConfigService} from "@nestjs/config";
import {TClientConfig, TGraviadConfig, TServerConfig} from "@app/config";
import {AuthService} from "./auth.service";


@Controller('auth')
export class AuthController {
    private readonly server: TServerConfig;
    private readonly client: TClientConfig;

    constructor(
        private readonly grvdConfig: ConfigService<TGraviadConfig>,
        private readonly authService: AuthService
    ) {

        this.server = this.grvdConfig.get('server', {infer: true});
        this.client = this.grvdConfig.get('client', {infer: true});
    }

    @Get()
    async index() {
        return {message: 'Auth module'}
    }

    @Get('login')
    async login(@Req() req: Request) {
        return this.authService.login(req);
    }


    @Get('logout')
    @Redirect('http://localhost:3000/homepage/login', HttpStatus.FOUND)
    async logout(@Req() req: Request, @Res() res: Response, @Next() next: any) {
        this.authService.logout(req, res);
        return {
            url: `http://localhost:3000/homepage/login`
        };
    }


    @Get('google')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Req() req: Request) {
        return {message: 'Google auth'}
    }

    @Get('google/callback')
    @UseGuards(GoogleOAuthGuard)
    @Redirect(`http://localhost:8000/auth/login/success`, HttpStatus.FOUND)
    googleAuthRedirect(@Req() req: Request) {
        return {
            url: `http://localhost:3000/dashboard`
        }
    }

    @Get('facebook')
    @UseGuards(FacebookOAuthGuard)
    async facebookAuth(@Req() req: Request) {
        return {message: 'Facebook auth'}
    }

    @Get('facebook/callback')
    @UseGuards(FacebookOAuthGuard)
    facebookAuthRedirect(@Req() req: Request) {
        return {
            url: 'auth/login/success'
        };
    }
}