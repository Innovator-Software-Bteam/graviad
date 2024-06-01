import {Inject} from "@nestjs/common";
import {CreateUserDto} from "@app/modules/user/dto/create-user.dto";
import {SocialLinkProvider} from "@app/modules/user/user.interface";

/**
 * @version 2.0
 */
export class CreateMerchantDto {
    readonly email: string;
    readonly description: string;
    readonly slogan: string;
    readonly address: string;
    readonly phone: string;
    readonly socialLinks: CreateSocialLinkDto [];
    readonly numberOfLikes: number;
    readonly numberOfProducts: number;
}

export class UpdateMerchantDto {
    readonly id?: string;
    readonly email?: string;
    readonly description?: string;
    readonly slogan?: string;
    readonly address?: string;
    readonly phone?: string;
    readonly socialLinks?: UpdateSocialLinkDto [];
    readonly numberOfLikes?: number;
    readonly numberOfProducts?: number;
}
export class CreateSocialLinkDto {
    readonly provider: SocialLinkProvider;
    readonly data: string;
}
export class UpdateSocialLinkDto {
    readonly id?: number;
    readonly provider?: SocialLinkProvider;
    readonly data?: string;
}