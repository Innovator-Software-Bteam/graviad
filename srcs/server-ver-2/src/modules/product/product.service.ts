import {BadRequestException, forwardRef, Inject, Injectable} from '@nestjs/common';
import {Product, ProductFeature, ProductMediaFromSpline, ProductThumbnail2D} from "@app/modules/product/entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {IDatabaseCRUD, IQuery} from "@app/interfaces";
import {
    CreateProductDTO,
    CreateProductFeatureDTO, CreateProductMediaFromSplineDTO, CreateProductThumbnailDTO,
    UpdateProductDTO,
    UpdateProductFeatureDTO, UpdateProductMediaFromSplineDTO, UpdateProductThumbnailDTO
} from "@app/modules/product/dto";
import {IProductCRUD, IProductInteraction, IProductQuery} from "@app/modules/product/product.interface";
import {MerchantService} from "@app/modules/merchant";

@Injectable()
export class ProductFeatureService implements IDatabaseCRUD<ProductFeature, CreateProductFeatureDTO> {
    constructor(
        @InjectRepository(ProductFeature)
        private readonly productFeatureRepository: Repository<ProductFeature>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {
    }

    async create(dto?: CreateProductFeatureDTO): Promise<ProductFeature> {
        const productFeature: ProductFeature = new ProductFeature();
        const product = await this.productRepository.findOneBy({
            id: dto.productId as any
        });
        if (!product) throw new BadRequestException('Product not found');
        productFeature.product = product;
        productFeature.name = dto.name;
        productFeature.description = dto.description;
        return this.productFeatureRepository.save(productFeature);
    }

    async find(query: IQuery): Promise<ProductFeature[]> {
        return await this.productFeatureRepository.find(query);
    }

    async findOne(query: IQuery): Promise<ProductFeature> {
        return await this.productFeatureRepository.findOne(query);
    }


    async delete(id: any): Promise<any> {
        return this.productFeatureRepository.delete(id);
    }

    async update(id: any, dto?: UpdateProductFeatureDTO): Promise<ProductFeature> {
        if (!dto) throw new BadRequestException('Missing data');
        const productFeature = await this.productFeatureRepository.findOne({
            where: {
                id: id
            }
        });
        const product = await this.productRepository.findOne({
            where: {
                id: dto.productId
            }
        })
        if(!productFeature || !product) throw new BadRequestException('Product feature or product not found');
        productFeature.name = dto.name || productFeature.name;
        productFeature.description = dto.description || productFeature.description;
        productFeature.product = product || productFeature.product;
        const p = await this.productFeatureRepository.save(productFeature);
        console.log(p);
        return p;
    }

    async replace(id: string | number, dto?: CreateProductFeatureDTO): Promise<ProductFeature> {
        return undefined;
    }


}

@Injectable()
export class ProductMediaFromSplineService implements IDatabaseCRUD<ProductMediaFromSpline, CreateProductMediaFromSplineDTO, UpdateProductThumbnailDTO> {
    constructor(
        @InjectRepository(ProductMediaFromSpline)
        private readonly productMediaFromSplineRepository: Repository<ProductMediaFromSpline>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {
    }

    async create(dto?: CreateProductMediaFromSplineDTO): Promise<ProductMediaFromSpline> {
        const productMediaFromSpline: ProductMediaFromSpline = new ProductMediaFromSpline();
        productMediaFromSpline.data = dto.data;
        return await this.productMediaFromSplineRepository.save(productMediaFromSpline);
    }

    async delete(id: any): Promise<any> {
        return this.productMediaFromSplineRepository.delete(id);
    }

    async update(id: any, dto?: UpdateProductMediaFromSplineDTO): Promise<ProductMediaFromSpline> {
        if (!id) throw new BadRequestException('Missing id');
        const productMediaFromSpline = new ProductMediaFromSpline();
        if (!productMediaFromSpline) throw new BadRequestException('Product media not found');
        productMediaFromSpline.id = dto.id;
        productMediaFromSpline.productId = dto.productId;
        productMediaFromSpline.data = dto.data;
        return await this.productMediaFromSplineRepository.save(productMediaFromSpline);
    }

    async findOne(query: IQuery): Promise<ProductMediaFromSpline> {
        return await this.productMediaFromSplineRepository.findOne(query);
    }

}

@Injectable()
export class ProductThumbnailService implements IDatabaseCRUD<ProductThumbnail2D, CreateProductThumbnailDTO, UpdateProductThumbnailDTO> {
    constructor(
        @InjectRepository(ProductThumbnail2D)
        private readonly productThumbnail2DRepository: Repository<ProductThumbnail2D>,
    ) {
    }

    async create(dto?: CreateProductThumbnailDTO): Promise<ProductThumbnail2D> {
        const productThumbnail2D: ProductThumbnail2D = new ProductThumbnail2D();
        const dataTransfer = Buffer.from(dto.data, 'base64');
        productThumbnail2D.data = dataTransfer;
        productThumbnail2D.altTexts = dto.altTexts;
        await this.productThumbnail2DRepository.save(productThumbnail2D);
        return productThumbnail2D;
    }

    async delete(id: string | number): Promise<ProductThumbnail2D> {
        await this.productThumbnail2DRepository.delete(id);
        return null;
    }

    async find(query: IQuery): Promise<ProductThumbnail2D[]> {
        return await this.productThumbnail2DRepository.find(query);
    }

    async findOne(query: IQuery): Promise<ProductThumbnail2D> {
        return await this.productThumbnail2DRepository.findOne(query);
    }

    async replace(id: number, dto?: CreateProductThumbnailDTO): Promise<ProductThumbnail2D> {
        if (!id) throw new BadRequestException('Missing id');
        const productThumbnail2D = await this.productThumbnail2DRepository.findOne({
            where: {
                id: id
            }
        })

        if (!productThumbnail2D) throw new BadRequestException('Product thumbnail not found');
        productThumbnail2D.id = dto.id;
        productThumbnail2D.data = dto.data;
        return await this.productThumbnail2DRepository.save(productThumbnail2D);
    }

    async update(id: number, dto?: UpdateProductThumbnailDTO): Promise<ProductThumbnail2D> {
        if (!id) throw new BadRequestException('Missing id');
        const productThumbnail2D = await this.productThumbnail2DRepository.findOne({
            where: {
                id: id
            }
        })

        if (!productThumbnail2D) throw new BadRequestException('Product thumbnail not found');
        productThumbnail2D.id = dto.id;
        const dataTransfer = Buffer.from(dto.data, 'base64');
        productThumbnail2D.data = dataTransfer;
        await this.productThumbnail2DRepository.save(productThumbnail2D);
        return productThumbnail2D;
    }

}

@Injectable()
export class ProductService implements IProductCRUD,
    IProductInteraction {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @Inject(forwardRef(() => ProductThumbnailService))
        private readonly productThumbnailService: ProductThumbnailService,
        @Inject(forwardRef(() => ProductFeatureService))
        private readonly productFeatureService: ProductFeatureService,
        @Inject(forwardRef(() => ProductMediaFromSplineService))
        private readonly productMediaFromSplineService: ProductMediaFromSplineService,
        @Inject(forwardRef(() => MerchantService))
        private readonly merchantService: MerchantService,
    ) {
    }

    async create(dto?: CreateProductDTO): Promise<Product> {
        if (!dto) throw new BadRequestException('Missing data');
        const product: Product = new Product();
        product.name = dto.name;
        product.price = dto.price;
        product.description = dto.description;
        product.version = dto.version;
        product.link = dto.link;
        product.brief = dto.brief;
        product.dateRelease = dto.dateRelease;
        product.highlightLabel = dto.highlightLabel;
        product.numberOfLikes = dto.numberOfLikes;
        product.merchantId = dto.merchantId;
        product.mediaFromSplineId = dto.mediaFromSplineId;

        if (dto.thumbnail2D) {
            product.thumbnail2D = await this.productThumbnailService.create(dto.thumbnail2D);
        }
        if (dto.features) {
            for (const feature of dto.features) {
                product.features.push(await this.productFeatureService.create(feature));
            }
        }
        // if (dto.mediaFromSpline) {
        //     product.mediaFromSpline = await this.productMediaFromSplineService.create(dto.mediaFromSpline);
        // }
        await this.productRepository.save(product);
        return product;
    }

    async findOne(query: IQuery): Promise<Product> {
        return await this.productRepository.findOne(query);
    }

    async find(query: IQuery): Promise<Product[]> {
        return await this.productRepository.find(query);
    }

    async delete(id: any): Promise<any> {
        await this.productRepository.delete(id);
        return null;
    }

    async replace(id: any, dto?: UpdateProductDTO): Promise<Product> {
        const product: Product = await this.productRepository.findOneBy({
            id: id
        });
        for (const key in dto) {
            if (key === 'features') continue;
            product[key] = dto[key];
        }
        if (dto.features) {
            for (const feature of dto.features) {
                const featureExtension = {
                    ...feature,
                    productId: product.id
                }
                if (feature.id) {
                    await this.productFeatureService.update(feature.id, featureExtension);
                } else {
                    await this.productFeatureService.create(featureExtension as CreateProductFeatureDTO);
                }
            }
        }
        return await this.productRepository.save(product);
    }

    async update(id: any, dto?: UpdateProductDTO): Promise<Product> {
        if (!dto) throw new BadRequestException('Missing data');
        if (!id) throw new BadRequestException('Missing id');
        const product = await this.productRepository.findOne({
            where: {
                id: id
            },
            relations: {
                thumbnail2D: true,
                features: true,
                mediaFromSpline: true,
                likedBy: true,
            }
        });
        if (!product) throw new BadRequestException('Product not found');
        product.name = dto.name || product.name;
        product.price = dto.price || product.price;
        product.description = dto.description || product.description;
        product.version = dto.version || product.version;
        product.link = dto.link || product.link;
        product.brief = dto.brief || product.brief;
        product.dateRelease = dto.dateRelease || product.dateRelease;
        product.highlightLabel = dto.highlightLabel || product.highlightLabel;
        product.numberOfLikes = dto.numberOfLikes || product.numberOfLikes;
        product.mediaFromSplineId = dto.mediaFromSplineId || product.mediaFromSplineId;
        if (dto.features) {
            console.log(dto.features);
            for (const feature of dto.features) {
                const featureFixed = {
                    ...feature,
                    productId: product.id
                }
                let featureEntity: ProductFeature;
                if (feature.id) {
                    featureEntity = await this.productFeatureService.update(feature.id, featureFixed);
                } else {
                    featureEntity = await this.productFeatureService.create(featureFixed as CreateProductFeatureDTO);
                }
                product.features = [...product.features, featureEntity];
            }
        }

        if (dto.thumbnail2D) {
            product.thumbnail2D = await this.productThumbnailService.update(product.thumbnail2D.id, dto.thumbnail2D);
        }
        product.likedBy = dto.likedBy || product.likedBy;
        return await this.productRepository.save(product);
    }

    async likesProduct(productId: number, merchantId: string): Promise<boolean> {
        // const product = await this.findBy({
        //     where: {
        //         id: productId
        //     }
        // });
        // const merchant = await this.merchantService.findBy({
        //     where: {
        //         id: merchantId
        //     }
        // });
        // if (!product || !merchant) throw new BadRequestException('Product or merchant not found');
        //
        // if (!product.likedByIds) product.likedByIds = [];
        // if (!product.likedBy) product.likedBy = [];
        //
        // product.likedBy.push(merchant);
        // return await this.productRepository.save(product);
        return true;
    }
}
