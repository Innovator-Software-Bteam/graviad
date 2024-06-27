import {PartialType} from "@nestjs/mapped-types";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateProductThumbnailDTO {
    @IsNumber({}, {message: 'Id must be a number'})
    readonly id: number;

    @IsNotEmpty({message: 'Data must be not empty'})
    readonly data: any;

    readonly altTexts: string[];

    readonly productId: number;
}
export class UpdateProductThumbnailDTO extends PartialType(CreateProductThumbnailDTO) {}
export class CreateProductMediaFromSplineDTO {
    @IsNumber({}, {message: 'Id must be a number'})
    readonly id?: number;

    @IsNumber({}, {message: 'Id must be a number'})
    readonly productId: number;

    @IsString()
    @IsNotEmpty({message: 'Data must be not empty'})
    readonly data: string;
}
export class UpdateProductMediaFromSplineDTO extends PartialType(CreateProductMediaFromSplineDTO) {}