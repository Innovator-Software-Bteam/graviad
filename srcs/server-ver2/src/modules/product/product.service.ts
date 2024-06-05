import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {Product, ProductFeature, ProductMediaFromSpline, ProductThumbnail2D} from "@app/modules/product/entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ICrud} from "@app/interfaces";
import {
    CreateProductDto,
    CreateProductFeatureDto, CreateProductMediaFromSplineDto,
    UpdateProductDto,
    UpdateProductFeatureDto, UpdateProductMediaFromSplineDto
} from "@app/modules/product/dto";

@Injectable()
export class ProductFeatureService implements ICrud<ProductFeature, CreateProductFeatureDto> {
    constructor(
        @InjectRepository(ProductFeature)
        private readonly productFeatureRepository: Repository<ProductFeature>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {
    }

    async create(dto?: CreateProductFeatureDto): Promise<ProductFeature> {
        const productFeature: ProductFeature = new ProductFeature();
        const product = await this.productRepository.findOneBy({
            id: dto.productId as any
        });
        if (!product) return null;
        productFeature.product = product;
        productFeature.name = dto.name;
        productFeature.description = dto.description;
        return this.productFeatureRepository.save(productFeature);
    }

    async delete(id: any): Promise<any> {
        return this.productFeatureRepository.delete(id);
    }

    async findAll(): Promise<ProductFeature[]> {
        return this.productFeatureRepository.find();
    }

    async findBy(id: any): Promise<ProductFeature> {
        return this.productFeatureRepository.findOne(id);
    }

    async update(id: any, dto?: UpdateProductFeatureDto): Promise<ProductFeature> {
        const productFeature: ProductFeature = await this.productFeatureRepository.findOneBy({
            id: dto.productId as any
        });
        if (!productFeature) return null;
        productFeature.name = dto.name;
        productFeature.description = dto.description;
        await this.productFeatureRepository.save(productFeature);
        return productFeature;
    }
}

@Injectable()
export class ProductMediaFromSplineService implements ICrud<ProductMediaFromSpline, CreateProductMediaFromSplineDto> {
    constructor(
        @InjectRepository(ProductMediaFromSpline)
        private readonly productMediaFromSplineRepository: Repository<ProductMediaFromSpline>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {
    }

    async create(dto?: CreateProductMediaFromSplineDto): Promise<ProductMediaFromSpline> {
        const productMediaFromSpline: ProductMediaFromSpline = new ProductMediaFromSpline();
        const product = await this.productRepository.findOneBy({
            id: dto.productId as any
        });
        if (!product) return null;
        productMediaFromSpline.product = product;
        productMediaFromSpline.data = dto.data;
        return this.productMediaFromSplineRepository.save(productMediaFromSpline);
    }

    async delete(id: any): Promise<any> {
        return this.productMediaFromSplineRepository.delete(id);
    }

    async findAll(): Promise<ProductMediaFromSpline[]> {
        return this.productMediaFromSplineRepository.find();
    }

    async findBy(id: any): Promise<ProductMediaFromSpline> {
        return this.productMediaFromSplineRepository.findOne(id);
    }

    async update(id: any, dto?: UpdateProductMediaFromSplineDto): Promise<ProductMediaFromSpline> {
        const productMediaFromSpline: ProductMediaFromSpline = await this.productMediaFromSplineRepository.findOneBy({
            id: dto.productId as any
        });
        if (!productMediaFromSpline) return null;
        await this.productMediaFromSplineRepository.save(productMediaFromSpline);
        return productMediaFromSpline;
    }
}

@Injectable()
export class ProductService implements ICrud<Product, CreateProductDto> {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductThumbnail2D)
        private readonly productThumbnail2DRepository: Repository<ProductThumbnail2D>,
        @Inject(forwardRef(() => ProductFeatureService))
        private readonly productFeatureService: ProductFeatureService,
        @Inject(forwardRef(() => ProductMediaFromSplineService))
        private readonly productMediaFromSplineService: ProductMediaFromSplineService,
    ) {
    }

    async create(dto?: CreateProductDto): Promise<Product> {
        const product: Product = new Product();
        const thumbnail2D = new ProductThumbnail2D();
        for (const key in dto) {
            product[key] = dto[key];
        }
        await this.productRepository.save(product);
        const savedProduct = await this.productRepository.find({
            where: {
                name: product.name,
                merchantId: product.merchantId
            }
        });
        thumbnail2D.product = savedProduct[0];
        thumbnail2D.altTexts = product.thumbnail2D.altTexts;
        thumbnail2D.data = Buffer.from(product.thumbnail2D.data, 'base64');
        await this.productThumbnail2DRepository.save(thumbnail2D);

        if (dto.mediaFromSpline) {
            await this.productMediaFromSplineService.create({
                productId: savedProduct[0].id,
                data: dto.mediaFromSpline.data,
            });
        }
        return product;
    }

    async delete(id: any): Promise<any> {
        return this.productRepository.delete(id);
    }

    async findAll(options: any): Promise<Product[]> {
        const {thumbnail2D} = options;
        const relations = ['features', 'mediaFromSpline'];
        if (thumbnail2D) relations.push('thumbnail2D');
        return this.productRepository.find({
            relations: relations
        });
    }

    async findAllByQuery(query: any): Promise<Product[]> {
        const {limit, page, ...where} = query;
        const take = limit && Number(limit);
        const skip = page && Number(page) * take;
        return this.productRepository.find({
            relations: ['thumbnail2D'],
            where,
            take,
            skip
        })
            .catch(err => {
                console.log(err);
                return [];
            });
    }

    async findBy(id: any): Promise<any> {
        return this.productRepository.findOne({
            where: {
                id: id
            },
            relations: ['thumbnail2D', 'features', 'mediaFromSpline'],
        })
    }

    async update(id: any, dto?: UpdateProductDto): Promise<Product> {
        const product: Product = await this.productRepository.findOneBy({
            id: id
        });
        for (const key in dto) {
            if (key === 'features') continue;
            product[key] = dto[key];
        }
        if (dto.features) {
            for (const feature of dto.features) {
                if (feature.id) {
                    await this.productFeatureService.update(feature.id, feature);
                } else {
                    await this.productFeatureService.create(feature as CreateProductFeatureDto);
                }
            }
        }
        return await this.productRepository.save(product);
    }

    async updatePartial(id: any, dto?: UpdateProductDto): Promise<Product> {
        const product: Product = await this.productRepository.findOne({
            where: {
                id: id
            },
            relations: ['features'],
        });
        if (!product) return null;
        product.name = dto.name || product.name;
        product.price = dto.price || product.price;
        product.description = dto.description || product.description;
        product.version = dto.version || product.version;
        product.link = dto.link || product.link;
        product.brief = dto.brief || product.brief;
        product.dateRelease = dto.dateRelease || product.dateRelease;
        product.highlightLabel = dto.highlightLabel || product.highlightLabel;
        product.numberOfLikes = dto.numberOfLikes || product.numberOfLikes;

        if (dto.features) {

            const currentFeatureIds = product.features.map(feature => feature.id);
            const updateFeatures = dto.features.filter(feature => currentFeatureIds.includes(feature.id));
            const newFeatures = dto.features.filter(feature => !feature.id);
            const deleteFeatureIds = currentFeatureIds.filter(id => !dto.features.some(feature => feature.id === id));

            // Update existing features
            for (const feature of updateFeatures) {
                await this.productFeatureService.update(feature.id, feature);
            }
            // Create new features
            for (const feature of newFeatures) {
                await this.productFeatureService.create(feature as CreateProductFeatureDto);
            }
            for (const id of deleteFeatureIds) {
                await this.productFeatureService.delete(id);
            }
        }

        if (dto.mediaFromSpline && dto.mediaFromSpline.data) {
            console.log('product', product);
            if(!product.mediaFromSpline) {
                await this.productMediaFromSplineService.create({
                    productId: product.id,
                    data: dto.mediaFromSpline.data,
                });
            } else {
                await this.productMediaFromSplineService.update(product.mediaFromSpline.id, dto.mediaFromSpline);
            }
        }
        await this.productRepository.save(product);
        return product;
    }
}
