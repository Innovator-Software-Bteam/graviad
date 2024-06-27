export declare class CreateProductThumbnailDTO {
    readonly id: number;
    readonly data: any;
    readonly altTexts: string[];
    readonly productId: number;
}
declare const UpdateProductThumbnailDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductThumbnailDTO>>;
export declare class UpdateProductThumbnailDTO extends UpdateProductThumbnailDTO_base {
}
export declare class CreateProductMediaFromSplineDTO {
    readonly id?: number;
    readonly productId: number;
    readonly data: string;
}
declare const UpdateProductMediaFromSplineDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProductMediaFromSplineDTO>>;
export declare class UpdateProductMediaFromSplineDTO extends UpdateProductMediaFromSplineDTO_base {
}
export {};
