import { Product, ProductFeature, ProductMediaFromSpline, ProductThumbnail2D } from "@app/modules/product/entities";
import { Repository } from "typeorm";
import { IDatabaseCRUD, IQuery } from "@app/interfaces";
import { CreateProductDTO, CreateProductFeatureDTO, CreateProductMediaFromSplineDTO, CreateProductThumbnailDTO, UpdateProductDTO, UpdateProductFeatureDTO, UpdateProductMediaFromSplineDTO, UpdateProductThumbnailDTO } from "@app/modules/product/dto";
import { IProductCRUD, IProductInteraction } from "@app/modules/product/product.interface";
import { MerchantService } from "@app/modules/merchant";
export declare class ProductFeatureService implements IDatabaseCRUD<ProductFeature, CreateProductFeatureDTO> {
    private readonly productFeatureRepository;
    private readonly productRepository;
    constructor(productFeatureRepository: Repository<ProductFeature>, productRepository: Repository<Product>);
    create(dto?: CreateProductFeatureDTO): Promise<ProductFeature>;
    find(query: IQuery): Promise<ProductFeature[]>;
    findOne(query: IQuery): Promise<ProductFeature>;
    delete(id: any): Promise<any>;
    update(id: any, dto?: UpdateProductFeatureDTO): Promise<ProductFeature>;
    replace(id: string | number, dto?: CreateProductFeatureDTO): Promise<ProductFeature>;
}
export declare class ProductMediaFromSplineService implements IDatabaseCRUD<ProductMediaFromSpline, CreateProductMediaFromSplineDTO, UpdateProductThumbnailDTO> {
    private readonly productMediaFromSplineRepository;
    private readonly productRepository;
    constructor(productMediaFromSplineRepository: Repository<ProductMediaFromSpline>, productRepository: Repository<Product>);
    create(dto?: CreateProductMediaFromSplineDTO): Promise<ProductMediaFromSpline>;
    delete(id: any): Promise<any>;
    update(id: any, dto?: UpdateProductMediaFromSplineDTO): Promise<ProductMediaFromSpline>;
}
export declare class ProductThumbnailService implements IDatabaseCRUD<ProductThumbnail2D, CreateProductThumbnailDTO, UpdateProductThumbnailDTO> {
    private readonly productThumbnail2DRepository;
    constructor(productThumbnail2DRepository: Repository<ProductThumbnail2D>);
    create(dto?: CreateProductThumbnailDTO): Promise<ProductThumbnail2D>;
    delete(id: string | number): Promise<ProductThumbnail2D>;
    find(query: IQuery): Promise<ProductThumbnail2D[]>;
    findOne(query: IQuery): Promise<ProductThumbnail2D>;
    replace(id: number, dto?: CreateProductThumbnailDTO): Promise<ProductThumbnail2D>;
    update(id: number, dto?: UpdateProductThumbnailDTO): Promise<ProductThumbnail2D>;
}
export declare class ProductService implements IProductCRUD, IProductInteraction {
    private readonly productRepository;
    private readonly productThumbnailService;
    private readonly productFeatureService;
    private readonly productMediaFromSplineService;
    private readonly merchantService;
    constructor(productRepository: Repository<Product>, productThumbnailService: ProductThumbnailService, productFeatureService: ProductFeatureService, productMediaFromSplineService: ProductMediaFromSplineService, merchantService: MerchantService);
    create(dto?: CreateProductDTO): Promise<Product>;
    findOne(query: IQuery): Promise<Product>;
    find(query: IQuery): Promise<Product[]>;
    delete(id: any): Promise<any>;
    replace(id: any, dto?: UpdateProductDTO): Promise<Product>;
    update(id: any, dto?: UpdateProductDTO): Promise<Product>;
    likesProduct(productId: number, merchantId: string): Promise<boolean>;
}
