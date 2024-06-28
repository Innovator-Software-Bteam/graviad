import {
    ProfileService,
    UserService
} from "./user.service";
import {UserController} from "./user.controller";
import {Profile, User} from "./entities";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {ProductModule} from "@app/modules/product/product.module";
import {MerchantModule, MerchantService} from "@app/modules/merchant";
import {TemplateModule} from "@app/modules/template/template.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Profile,
            User,
        ]),
        ProductModule,
        MerchantModule,
        TemplateModule
    ],
    controllers: [UserController],
    providers: [UserService, ProfileService],
    exports: [UserService, ProfileService]
})
export class UserModule {
}