import { CreateProductMediaFromSplineDTO, CreateProductThumbnailDTO } from "@app/modules/product/dto";
export declare class CreateProductFeatureDTO {
    readonly id: number;
    readonly productId: number;
    readonly name: string;
    readonly description: string;
}
declare const UpdateProductFeatureDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductFeatureDTO>>;
export declare class UpdateProductFeatureDTO extends UpdateProductFeatureDTO_base {
}
export declare class CreateProductDTO {
    readonly id?: number;
    readonly name: string;
    readonly price?: string;
    readonly description?: string;
    readonly version?: string;
    readonly link?: string;
    readonly brief: string;
    readonly dateRelease?: Date;
    readonly highlightLabel?: string;
    readonly numberOfLikes?: number;
    readonly thumbnail2D?: CreateProductThumbnailDTO;
    readonly mediaFromSpline?: CreateProductMediaFromSplineDTO;
    readonly features?: CreateProductFeatureDTO[];
    readonly likedByIds?: string[];
    readonly likedBy?: any[];
    readonly merchantId: string;
}
declare const UpdateProductDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductDTO>>;
export declare class UpdateProductDTO extends UpdateProductDTO_base {
}
export {};
