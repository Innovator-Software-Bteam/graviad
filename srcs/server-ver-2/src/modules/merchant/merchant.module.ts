import {forwardRef, Module} from '@nestjs/common';
import {AvatarService, MerchantService, SocialLinkService} from './merchant.service';
import {MerchantController} from './merchant.controller';
import {Avatar, Merchant, SocialLink} from "./entities";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TemplateModule} from "@app/modules/template/template.module";
import {UserModule} from "@app/modules/user";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Avatar,
            SocialLink,
            Merchant,
        ]),
        forwardRef(() => UserModule),
        TemplateModule,
    ],
    providers: [MerchantService, AvatarService, SocialLinkService],
    controllers: [MerchantController],
    exports: [MerchantService, AvatarService, SocialLinkService],
})
export class MerchantModule {
}
