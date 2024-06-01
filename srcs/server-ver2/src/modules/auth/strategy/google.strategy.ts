import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
import * as process from "process";
import {ProfileService, TProfile, UserService} from "@app/modules/user";
import {User} from "@app/modules/user/entities";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly configService: ConfigService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        @Inject(forwardRef(() => ProfileService))
        private readonly profileService: ProfileService,
    ) {

        super({
            clientID: process.env.GRAVIAD_GOOGLE_CLIENT_ID,
            clientSecret: process.env.GRAVIAD_GOOGLE_CLIENT_SECRET,
            callbackURL: configService.get<URL>('graviad.google.callbackUrl').toString(),
            scope: ['email', 'profile'],
        });

    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const {emails} = profile;
        console.log(profile)
        const user: User = await this.userService.findBy({
            email: emails[0].value,
        });
        if (!user) {
            const newProfile = await this.profileService.create(profile as TProfile);
            await this.userService.create({
                email: emails[0].value,
                profile: newProfile as any,
            });
            done(null, user);
        } else if (!user.profile || !user.profile.id) {
            user.profile = await this.profileService.create(profile as any);
            await this.userService.update(user.id, user);
            done(null, user);
        }
    }
}