import {IsArray, IsEmpty, IsNumber} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";

export class CreateAvatar2DDto {
    @IsNumber()
    readonly id?: number;

    @IsEmpty({message: 'Data is required'})
    readonly data: any;

    @IsArray()
    readonly altTexts: string[];

    readonly merchantId: string;
}

export class UpdateAvatar2DDto extends PartialType(CreateAvatar2DDto) {
}