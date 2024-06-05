import {PartialType} from "@nestjs/mapped-types";
import {IsString} from "class-validator";

export class CreateProductThumbnail2D {
    readonly id: number;
    readonly data: any;
}
export class UpdateProductThumbnail2D extends PartialType(CreateProductThumbnail2D) {}
export class CreateProductMediaFromSplineDto {
    readonly id?: number;
    readonly productId: any;

    @IsString()
    readonly data: string;
}
export class UpdateProductMediaFromSplineDto extends PartialType(CreateProductMediaFromSplineDto) {}