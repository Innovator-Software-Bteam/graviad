"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = exports.ProductThumbnailService = exports.ProductMediaFromSplineService = exports.ProductFeatureService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("./entities");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const merchant_1 = require("../merchant");
let ProductFeatureService = class ProductFeatureService {
    constructor(productFeatureRepository, productRepository) {
        this.productFeatureRepository = productFeatureRepository;
        this.productRepository = productRepository;
    }
    async create(dto) {
        const productFeature = new entities_1.ProductFeature();
        const product = await this.productRepository.findOneBy({
            id: dto.productId
        });
        if (!product)
            throw new common_1.BadRequestException('Product not found');
        productFeature.product = product;
        productFeature.name = dto.name;
        productFeature.description = dto.description;
        return this.productFeatureRepository.save(productFeature);
    }
    async find(query) {
        return await this.productFeatureRepository.find(query);
    }
    async findOne(query) {
        return await this.productFeatureRepository.findOne(query);
    }
    async delete(id) {
        return this.productFeatureRepository.delete(id);
    }
    async update(id, dto) {
        if (!dto)
            throw new common_1.BadRequestException('Missing data');
        const productFeature = await this.productFeatureRepository.findOne({
            where: {
                id: id
            }
        });
        const product = await this.productRepository.findOne({
            where: {
                id: dto.productId
            }
        });
        if (!productFeature || !product)
            throw new common_1.BadRequestException('Product feature or product not found');
        productFeature.name = dto.name || productFeature.name;
        productFeature.description = dto.description || productFeature.description;
        productFeature.product = product || productFeature.product;
        const p = await this.productFeatureRepository.save(productFeature);
        console.log(p);
        return p;
    }
    async replace(id, dto) {
        return undefined;
    }
};
exports.ProductFeatureService = ProductFeatureService;
exports.ProductFeatureService = ProductFeatureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ProductFeature)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductFeatureService);
let ProductMediaFromSplineService = class ProductMediaFromSplineService {
    constructor(productMediaFromSplineRepository, productRepository) {
        this.productMediaFromSplineRepository = productMediaFromSplineRepository;
        this.productRepository = productRepository;
    }
    async create(dto) {
        const productMediaFromSpline = new entities_1.ProductMediaFromSpline();
        productMediaFromSpline.data = dto.data;
        return await this.productMediaFromSplineRepository.save(productMediaFromSpline);
    }
    async delete(id) {
        return this.productMediaFromSplineRepository.delete(id);
    }
    async update(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Missing id');
        const productMediaFromSpline = new entities_1.ProductMediaFromSpline();
        if (!productMediaFromSpline)
            throw new common_1.BadRequestException('Product media not found');
        productMediaFromSpline.id = dto.id;
        productMediaFromSpline.productId = dto.productId;
        productMediaFromSpline.data = dto.data;
        return await this.productMediaFromSplineRepository.save(productMediaFromSpline);
    }
};
exports.ProductMediaFromSplineService = ProductMediaFromSplineService;
exports.ProductMediaFromSplineService = ProductMediaFromSplineService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ProductMediaFromSpline)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductMediaFromSplineService);
let ProductThumbnailService = class ProductThumbnailService {
    constructor(productThumbnail2DRepository) {
        this.productThumbnail2DRepository = productThumbnail2DRepository;
    }
    async create(dto) {
        const productThumbnail2D = new entities_1.ProductThumbnail2D();
        const dataTransfer = Buffer.from(dto.data, 'base64');
        productThumbnail2D.data = dataTransfer;
        productThumbnail2D.altTexts = dto.altTexts;
        await this.productThumbnail2DRepository.save(productThumbnail2D);
        return productThumbnail2D;
    }
    async delete(id) {
        await this.productThumbnail2DRepository.delete(id);
        return null;
    }
    async find(query) {
        return await this.productThumbnail2DRepository.find(query);
    }
    async findOne(query) {
        return await this.productThumbnail2DRepository.findOne(query);
    }
    async replace(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Missing id');
        const productThumbnail2D = await this.productThumbnail2DRepository.findOne({
            where: {
                id: id
            }
        });
        if (!productThumbnail2D)
            throw new common_1.BadRequestException('Product thumbnail not found');
        productThumbnail2D.id = dto.id;
        productThumbnail2D.data = dto.data;
        return await this.productThumbnail2DRepository.save(productThumbnail2D);
    }
    async update(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Missing id');
        const productThumbnail2D = await this.productThumbnail2DRepository.findOne({
            where: {
                id: id
            }
        });
        if (!productThumbnail2D)
            throw new common_1.BadRequestException('Product thumbnail not found');
        productThumbnail2D.id = dto.id;
        const dataTransfer = Buffer.from(dto.data, 'base64');
        productThumbnail2D.data = dataTransfer;
        await this.productThumbnail2DRepository.save(productThumbnail2D);
        return productThumbnail2D;
    }
};
exports.ProductThumbnailService = ProductThumbnailService;
exports.ProductThumbnailService = ProductThumbnailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ProductThumbnail2D)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductThumbnailService);
let ProductService = class ProductService {
    constructor(productRepository, productThumbnailService, productFeatureService, productMediaFromSplineService, merchantService) {
        this.productRepository = productRepository;
        this.productThumbnailService = productThumbnailService;
        this.productFeatureService = productFeatureService;
        this.productMediaFromSplineService = productMediaFromSplineService;
        this.merchantService = merchantService;
    }
    async create(dto) {
        if (!dto)
            throw new common_1.BadRequestException('Missing data');
        const product = new entities_1.Product();
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
        if (dto.thumbnail2D) {
            product.thumbnail2D = await this.productThumbnailService.create(dto.thumbnail2D);
        }
        if (dto.features) {
            for (const feature of dto.features) {
                product.features.push(await this.productFeatureService.create(feature));
            }
        }
        await this.productRepository.save(product);
        return product;
    }
    async findOne(query) {
        return await this.productRepository.findOne(query);
    }
    async find(query) {
        return await this.productRepository.find(query);
    }
    async delete(id) {
        await this.productRepository.delete(id);
        return null;
    }
    async replace(id, dto) {
        const product = await this.productRepository.findOneBy({
            id: id
        });
        for (const key in dto) {
            if (key === 'features')
                continue;
            product[key] = dto[key];
        }
        if (dto.features) {
            for (const feature of dto.features) {
                const featureExtension = {
                    ...feature,
                    productId: product.id
                };
                if (feature.id) {
                    await this.productFeatureService.update(feature.id, featureExtension);
                }
                else {
                    await this.productFeatureService.create(featureExtension);
                }
            }
        }
        return await this.productRepository.save(product);
    }
    async update(id, dto) {
        if (!dto)
            throw new common_1.BadRequestException('Missing data');
        if (!id)
            throw new common_1.BadRequestException('Missing id');
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
        if (!product)
            throw new common_1.BadRequestException('Product not found');
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
            console.log(dto.features);
            for (const feature of dto.features) {
                const featureFixed = {
                    ...feature,
                    productId: product.id
                };
                let featureEntity;
                if (feature.id) {
                    featureEntity = await this.productFeatureService.update(feature.id, featureFixed);
                }
                else {
                    featureEntity = await this.productFeatureService.create(featureFixed);
                }
                product.features = [...product.features, featureEntity];
            }
        }
        if (dto.thumbnail2D) {
            product.thumbnail2D = await this.productThumbnailService.update(product.thumbnail2D.id, dto.thumbnail2D);
        }
        if (dto.mediaFromSpline) {
            product.mediaFromSpline = await this.productMediaFromSplineService.update(product.mediaFromSpline.id, dto.mediaFromSpline);
        }
        product.likedBy = dto.likedBy || product.likedBy;
        return await this.productRepository.save(product);
    }
    async likesProduct(productId, merchantId) {
        return true;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Product)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => ProductThumbnailService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => ProductFeatureService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => ProductMediaFromSplineService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => merchant_1.MerchantService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        ProductThumbnailService,
        ProductFeatureService,
        ProductMediaFromSplineService,
        merchant_1.MerchantService])
], ProductService);
//# sourceMappingURL=product.service.js.map