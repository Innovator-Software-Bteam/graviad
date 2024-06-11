import {
    CreateProductMediaFromSplineDto,
    CreateProductThumbnail2D
} from "@app/modules/product/dto/productMedia.dto";
import {IsArray, IsCurrency, IsDate, IsNumber, IsObject, IsString, Length, Max} from "class-validator";
import {PartialType} from "@nestjs/mapped-types";

export class CreateProductFeatureDto {
    @IsNumber({}, {message: 'Id must be a number'})
    readonly id: number;

    readonly productId: number | string;

    @IsString({message: 'Name must be a string'})
    @Length(1, 20, {message: 'Name must be between 1 and 20 characters'})
    readonly name: string;

    @IsString({message: 'Description must be a string'})
    @Max(100, {message: 'Description must be less than 60 characters'})
    readonly description: string;
}

export class UpdateProductFeatureDto extends PartialType(CreateProductFeatureDto) {

}

export class ProductDto {
    @IsNumber({}, {message: 'Id must be a number'})
    readonly id?: number;

    @IsString({message: 'Name must be a string'})
    @Length(1, 20, {message: 'Name must be between 1 and 20 characters'})
    readonly name: string;

    @IsCurrency({}, {message: 'Price must be a currency'})
    readonly price: string;

    @IsString({message: 'Description must be a string'})
    readonly description: string;

    @IsString({message: 'Version must be a string'})
    readonly version: string;
    readonly link: string;

    @IsString({message: 'Brief must be a string'})
    @Max(100, {message: 'Brief must be less than 60 characters'})
    readonly brief: string;

    @IsDate({message: 'Date release must be a date'})
    readonly dateRelease: Date;

    @IsString({message: 'Highlight label must be a string'})
    @Length(1, 20, {message: 'Highlight label must be between 1 and 20 characters'})
    readonly highlightLabel: string;

    @IsNumber({}, {message: 'Number of likes must be a number'})
    readonly numberOfLikes: number;

    readonly thumbnail2D?: CreateProductThumbnail2D;
    
    readonly mediaFromSpline?: CreateProductMediaFromSplineDto;

    @IsArray({message: 'Features must be an array'})
    readonly features?: CreateProductFeatureDto[];

    @IsArray({message: 'Liked by ids must be an array'})
    readonly likedByIds?: string[];
}

export class UpdateProductDto extends PartialType(ProductDto) {
}