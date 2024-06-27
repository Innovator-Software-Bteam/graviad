import { TSocialLinkProvider } from "../merchant.interface";
import { CreateAvatarDTO } from "@app/modules/user/dto/property.dto";
export declare class CreateMerchantDto {
    readonly id?: string;
    readonly name: string;
    readonly email: string;
    readonly description: string;
    readonly slogan: string;
    readonly address: string;
    readonly phone: string;
    readonly socialLinks: CreateSocialLinkDto[];
    readonly numberOfLikes: number;
    readonly numberOfProducts: number;
    readonly avatar: CreateAvatarDTO;
    readonly usingTemplateProfileCardId: number;
    readonly userId: string;
}
declare const UpdateMerchantDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMerchantDto>>;
export declare class UpdateMerchantDto extends UpdateMerchantDto_base {
}
export declare class CreateSocialLinkDto {
    readonly id?: number;
    readonly provider: TSocialLinkProvider;
    readonly data: string;
    readonly merchantId: string;
}
declare const UpdateSocialLinkDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSocialLinkDto>>;
export declare class UpdateSocialLinkDto extends UpdateSocialLinkDto_base {
}
export {};
