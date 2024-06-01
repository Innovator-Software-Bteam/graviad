import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-facebook';
import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {UserService} from "@app/modules/user";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(
        private readonly configService: ConfigService,

        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {
        super({
            clientID: process.env.GRAVIAD_FACEBOOK_CLIENT_ID,
            clientSecret: process.env.GRAVIAD_FACEBOOK_CLIENT_SECRET,
            callbackURL: configService.get<URL>('graviad.facebook.callbackUrl').toString(),
            profileFields: ['id', 'emails', 'name'],
            scope: ['email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: (err: any, user: any, info?: any) => void): Promise<any> {
        const { name, emails } = profile;
        const user = await this.userService.findBy({
            email: emails[0].value,
        });
        done(null, user);
    }
}