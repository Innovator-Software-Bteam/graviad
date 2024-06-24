import {IsArray, IsEmpty, IsNumber} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";

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