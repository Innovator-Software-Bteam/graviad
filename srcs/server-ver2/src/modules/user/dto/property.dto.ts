import {IsArray, IsEmpty, IsNumber} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";
import {TProfile} from "@app/modules/user";

export class CreateAvatarDTO {
    @IsNumber()
    readonly id?: number;

    @IsEmpty({message: 'Data is required'})
    readonly data: any;

    @IsArray()
    readonly altTexts: string[];

    readonly merchantId: string;
}

export class UpdateAvatarDTO extends PartialType(CreateAvatarDTO) {
}

export class CreateProfileDTO {
    @IsNumber()
    readonly id?: string;

    @IsEmpty({message: 'Data is required'})
    readonly data: TProfile;

    readonly provider: string;
}

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {
}