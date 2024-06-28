import {
    CreateProductMediaFromSplineDTO,
    CreateProductThumbnailDTO
} from "@app/modules/product/dto";
import {
    IsArray,
    IsCurrency,
    IsDate,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    Length,
    Max,
    ValidateIf
} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";

export class CreateProductFeatureDTO {
    @IsNumber({}, {message: 'Id must be a number'})
    readonly id: number;

    @IsNumber({}, {message: 'Product id must be a number'})
    readonly productId: number;

    @IsString({message: 'Name must be a string'})
    @Length(1, 20, {message: 'Name must be between 1 and 20 characters'})
    readonly name: string;

    @IsString({message: 'Description must be a string'})
    @Max(100, {message: 'Description must be less than 60 characters'})
    readonly description: string;
}

export class UpdateProductFeatureDTO extends PartialType(CreateProductFeatureDTO) {

}

export class CreateProductDTO {
    @IsOptional()
    @IsNumber({}, {message: 'Id must be a number'})
    readonly id?: number;

    @IsOptional()
    @IsString({message: 'Name must be a string'})
    @Length(1, 20, {message: 'Name must be between 1 and 20 characters'})
    readonly name: string;

    @IsOptional()
    readonly price?: string;

    @IsOptional()
    @IsString({message: 'Description must be a string'})
    readonly description?: string;

    @IsOptional()
    @IsString({message: 'Version must be a string'})
    readonly version?: string;

    @IsOptional()
    readonly link?: string;

    @IsOptional()
    @IsString({message: 'Brief must be a string'})
    @Length(1, 100, {message: 'Brief must be between 1 and 100 characters'})
    readonly brief: string;

    @IsOptional()
    readonly dateRelease?: Date;

    @IsOptional()
    @IsString({message: 'Highlight label must be a string'})
    @Length(1, 20, {message: 'Highlight label must be between 1 and 20 characters'})
    readonly highlightLabel?: string;

    @IsOptional()
    @IsNumber({}, {message: 'Number of likes must be a number'})
    readonly numberOfLikes?: number;

    @IsOptional()
    @IsObject({message: 'Thumbnail 2D must be an object'})
    readonly thumbnail2D?: CreateProductThumbnailDTO;

    @IsOptional()
    @IsArray({message: 'Features must be an array'})
    readonly features?: CreateProductFeatureDTO[];

    @IsOptional()
    @IsArray({message: 'Liked by ids must be an array'})
    readonly likedByIds?: string[];
    readonly likedBy?: any [];

    @IsString({message: 'Merchant id must be a string'})
    readonly merchantId: string;

    @IsOptional()
    @IsString({message: 'Media from spline id must be a string'})
    readonly mediaFromSplineId: string;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {
}