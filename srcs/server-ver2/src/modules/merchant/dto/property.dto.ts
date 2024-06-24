import {IsArray, IsEmpty, IsNumber, IsString} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";

export class CreateAvatarDTO {
    @IsNumber()
    readonly id?: number;

    @IsEmpty({message: 'Data is required'})
    readonly data: any;

    @IsArray()
    readonly altTexts: string[];

    @IsEmpty({message: 'Merchant id is required'})
    @IsString({message: 'Merchant id must be a string'})
    readonly merchantId: string;
}

export class UpdateAvatarDTO extends PartialType(CreateAvatarDTO) {
}