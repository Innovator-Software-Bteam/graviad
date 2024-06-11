import {
    Avatar2DService,
    MerchantService,
    ProfileService,
    SocialLinkService,
    UserService
} from "./user.service";
import {MerchantController, SocialLinkController} from "@app/modules/user/user.controller";
import {UserController} from "./user.controller";
import {Merchant, Profile, SocialLink, User, Avatar2D} from "./entities";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Profile,
            Avatar2D,
            User,
            Merchant,
            SocialLink,
        ]),
    ],
    controllers: [UserController, MerchantController, SocialLinkController],
    providers: [UserService, ProfileService, MerchantService, SocialLinkService, Avatar2DService],
    exports: [UserService, ProfileService, MerchantService]
})
export class UserModule {
}