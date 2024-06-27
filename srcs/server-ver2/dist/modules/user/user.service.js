"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("./entities");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_1 = require("../product");
const merchant_1 = require("../merchant");
const console = __importStar(require("node:console"));
let ProfileService = class ProfileService {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async create(dto) {
        const profile = new entities_1.Profile();
        if (dto.id)
            profile.id = dto.id;
        profile.provider = dto.provider;
        profile.data = dto.data;
        return this.profileRepository.save(profile);
    }
    async delete(id) {
        return this.profileRepository.delete(id);
    }
    async findOrCreate(id, dto) {
        const profile = await this.profileRepository.findOneBy({ id });
        if (profile)
            return profile;
        return this.create(dto);
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Profile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfileService);
let UserService = class UserService {
    constructor(userRepository, productService, merchantService) {
        this.userRepository = userRepository;
        this.productService = productService;
        this.merchantService = merchantService;
    }
    async create(dto) {
        if (dto?.id)
            throw new Error('Id is exist, please use update method');
        const user = new entities_1.User();
        user.email = dto.email;
        return await this.userRepository.save(dto);
    }
    async delete(id) {
        return await this.userRepository.delete(id);
    }
    async find(query) {
        return await this.userRepository.find(query);
    }
    async findOne(query) {
        return await this.userRepository.findOne(query);
    }
    async replace(id, dto) {
        return await this.userRepository.save({
            id,
            email: dto.email,
        });
    }
    async update(id, dto) {
        if (!id)
            throw new Error('id is required');
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        if (dto.merchantId)
            user.merchantId = dto.merchantId;
        return await this.userRepository.save(user);
    }
    async findOrCreate(id, dto) {
        const user = await this.userRepository.findOneBy({ id });
        if (user)
            return user;
        return this.create(dto);
    }
    async findOrCreateByEmail(email, dto) {
        const user = await this.userRepository.findOneBy({
            email
        });
        if (user)
            return user;
        return this.create(dto);
    }
    async likeProduct(userId, productId) {
        const user = await this.findOne({
            where: {
                id: userId
            },
        });
        const product = await this.productService.findOne({
            where: { id: productId },
            relations: ['likedBy']
        });
        if (!user || !product)
            throw new common_1.BadRequestException('User or Product not found');
        if (!product.likedBy)
            product.likedBy = [];
        product.likedBy.push(user);
        const p = await this.productService.update(productId, {
            numberOfLikes: product.numberOfLikes + 1,
            likedBy: product.likedBy,
        });
        return await this.userRepository.save(user);
    }
    async unlikeProduct(userId, productId) {
        const user = await this.findOne({
            where: {
                id: userId
            },
        });
        const product = await this.productService.findOne({
            where: {
                id: productId
            },
            relations: ['likedBy']
        });
        if (!user || !product)
            throw new common_1.BadRequestException('User or Product not found');
        product.likedBy = product.likedBy.filter(u => u.id !== userId) || [];
        const p = await this.productService.update(productId, {
            numberOfLikes: product.numberOfLikes - 1,
            likedBy: product.likedBy,
        });
        console.log('p', p);
        return await this.userRepository.save(user);
    }
    async followMerchant(userId, merchantId) {
        const user = await this.findOne({
            where: {
                id: userId
            },
            relations: ['followingMerchants']
        });
        const merchant = await this.merchantService.findOne({
            where: {
                id: merchantId
            },
            relations: ['followers']
        });
        if (!user || !merchant)
            throw new common_1.BadRequestException('User or Merchant not found');
        user.followingMerchants = user.followingMerchants || [];
        user.followingMerchants.push(merchant);
        return await this.userRepository.save(user);
    }
    async unfollowMerchant(userId, merchantId) {
        const user = await this.findOne({
            where: {
                id: userId
            },
            relations: ['followingMerchants']
        });
        const merchant = await this.merchantService.findOne({
            where: {
                id: merchantId
            },
            relations: ['followers']
        });
        if (!user || !merchant)
            throw new common_1.BadRequestException('User or Merchant not found');
        user.followingMerchants = user.followingMerchants || [];
        merchant.followers = merchant.followers || [];
        user.followingMerchants = user.followingMerchants.filter(m => m.id !== merchantId);
        merchant.followers = merchant.followers.filter(u => u.id !== userId);
        return await this.userRepository.save(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => product_1.ProductService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => merchant_1.MerchantService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        product_1.ProductService,
        merchant_1.MerchantService])
], UserService);
//# sourceMappingURL=user.service.js.map