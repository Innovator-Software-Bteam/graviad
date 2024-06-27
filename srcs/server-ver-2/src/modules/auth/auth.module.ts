import {Module, UseGuards} from '@nestjs/common';
import {AuthController, SessionSerializer} from "@app/modules/auth";
import {AuthService} from "@app/modules/auth";
import {FacebookStrategy, GoogleStrategy} from "@app/modules/auth/strategy";
import {PassportModule} from '@nestjs/passport'
import {UserModule} from "@app/modules/user";

@Module({
    imports: [
        PassportModule.register({session: true,defaultStrategy: 'google'}),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        GoogleStrategy,
        FacebookStrategy,
        SessionSerializer,
    ],
    exports: [
        AuthService,
    ]
})
export class AuthModule {
}