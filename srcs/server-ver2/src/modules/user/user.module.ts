import {
    Avatar2DService,
    MerchantController,
    MerchantService,
    ProfileService,
    SocialLinkService,
    UserService
} from "@app/modules/user";
import {UserController} from "@app/modules/user";
import {Merchant, Profile, SocialLink, User, Avatar2D} from "@app/modules/user/entities";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User,
            Avatar2D,
            Merchant,
            SocialLink,
            Profile,
        ]),
    ],
    controllers: [UserController, MerchantController],
    providers: [UserService, ProfileService, MerchantService, SocialLinkService, Avatar2DService],
    exports: [UserService, ProfileService, MerchantService]
})
export class UserModule {
}