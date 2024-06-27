import { TProfile } from "@app/modules/user";
export declare class CreateAvatarDTO {
    readonly id?: number;
    readonly data: any;
    readonly altTexts: string[];
    readonly merchantId: string;
}
declare const UpdateAvatarDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAvatarDTO>>;
export declare class UpdateAvatarDTO extends UpdateAvatarDTO_base {
}
export declare class CreateProfileDTO {
    readonly id?: string;
    readonly data: TProfile;
    readonly provider: string;
}
declare const UpdateProfileDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProfileDTO>>;
export declare class UpdateProfileDTO extends UpdateProfileDTO_base {
}
export {};
