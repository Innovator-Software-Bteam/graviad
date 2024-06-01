import {CreateProductThumbnail2D} from "@app/modules/product/dto/create-productImages.dto";

export class CreateProductFeatureDto {
    readonly id?: number | string;
    readonly name: string;
    readonly description: string;
    readonly productId: number | string;
}
export class UpdateProductFeatureDto {
    readonly id?: number;
    readonly productId: number | string;
    readonly name?: string;
    readonly description?: string;
}

export class CreateProductDto {
    readonly name: string;
    readonly price: string;
    readonly description: string;
    readonly version: string;
    readonly link: string;
    readonly brief: string;
    readonly dateRelease: Date;
    readonly highlightLabel: string;
    readonly numberOfLikes: number;

    readonly thumbnail2D?: CreateProductThumbnail2D;
    readonly features?: CreateProductFeatureDto[];
}
export class UpdateProductDto {
    readonly id?: number;
    readonly name?: string;
    readonly price?: string;
    readonly description?: string;
    readonly version?: string;
    readonly link?: string;
    readonly brief?: string;
    readonly dateRelease?: Date;
    readonly highlightLabel?: string;
    readonly numberOfLikes?: number;

    readonly thumbnail2D?: CreateProductThumbnail2D;
    readonly features?: UpdateProductFeatureDto[];
}