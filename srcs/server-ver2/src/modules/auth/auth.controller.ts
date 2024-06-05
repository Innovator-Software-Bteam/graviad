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

@Controller('auth')
export class AuthController {
    private readonly server: TServerConfig;
    private readonly client: TClientConfig;

    constructor(
        private readonly grvdConfig: ConfigService<TGraviadConfig>,
    ) {
        this.server = this.grvdConfig.get('server', {infer: true});
        this.client = this.grvdConfig.get('client', {infer: true});

        console.log('Server config:', this.server);
    }

    @Get()
    async index() {
        return {message: 'Auth module'}
    }

    // @Get('login')
    // async login(@Req() req: Request, @Res() res: Response, @Next() next: any) {
    //     if (req.isAuthenticated()) {
    //         return {url: '/auth/login/success'};
    //     } else {
    //         return {url: '/auth/login/failed'};
    //     }
    // }

    @Get('login/success')
    @UseGuards(AuthGuard)
    async loginSuccess(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        return res.status(200).json({message: 'LoginPage success', user: req.user, status: req.isAuthenticated()});
    }

    @Get('login/failed')
    @UseGuards(AuthGuard)
    async loginFailed(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        return {message: 'LoginPage failed'}
    }

    @Get('logout')
    @Redirect('http://localhost:3000/homepage/login', HttpStatus.FOUND)
    async logout(@Req() req: Request, @Res() res: Response, @Next() next: any) {
        req.logout((done) => {
        });
        return {
            message: 'Logout success',
            url: `/auth/login/failed`
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
        console.log('Client config:', this.client)
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