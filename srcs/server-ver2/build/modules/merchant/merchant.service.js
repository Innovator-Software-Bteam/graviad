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
exports.MerchantService = exports.AvatarService = exports.SocialLinkService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("./entities");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const template_service_1 = require("../template/template.service");
const user_1 = require("../user");
let SocialLinkService = class SocialLinkService {
    constructor(socialLinkRepository) {
        this.socialLinkRepository = socialLinkRepository;
    }
    async create(dto) {
        const socialLink = new entities_1.SocialLink();
        socialLink.provider = dto.provider;
        socialLink.data = dto.data;
        return await this.socialLinkRepository.save(socialLink);
    }
    async delete(id) {
        return await this.socialLinkRepository.delete(id);
    }
    async findOne(query) {
        return await this.socialLinkRepository.findOne(query);
    }
    async update(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Id is required');
        const socialLink = await this.findOne({ where: { id } });
        if (!socialLink)
            throw new common_1.BadRequestException('Social link not found');
        socialLink.provider = dto.provider;
        socialLink.data = dto.data;
        return await this.socialLinkRepository.save(socialLink);
    }
    async find(query) {
        return await this.socialLinkRepository.find(query);
    }
    async replace(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Id is required');
        const socialLink = await this.findOne({ where: { id } });
        if (!socialLink)
            throw new common_1.BadRequestException('Social link not found');
        socialLink.provider = dto.provider;
        socialLink.data = dto.data;
        return await this.socialLinkRepository.save(socialLink);
    }
};
exports.SocialLinkService = SocialLinkService;
exports.SocialLinkService = SocialLinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.SocialLink)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SocialLinkService);
let AvatarService = class AvatarService {
    constructor(avatar2DRepository) {
        this.avatar2DRepository = avatar2DRepository;
    }
    async create(dto) {
        const avatar2D = new entities_1.Avatar();
        if (!dto.data)
            throw new common_1.BadRequestException('Data is required');
        if (!dto.merchantId)
            throw new common_1.BadRequestException('Merchant id is required');
        const dataTransfer = Buffer.from(dto.data, 'base64');
        avatar2D.data = dataTransfer;
        avatar2D.altTexts = dto.altTexts;
        avatar2D.merchantId = dto.merchantId;
        return await this.avatar2DRepository.save(avatar2D);
    }
    async delete(id) {
        if (!id)
            throw new common_1.BadRequestException('Id is required');
        return await this.avatar2DRepository.delete(id);
    }
    async update(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Id is required');
        const avatar = await this.avatar2DRepository.findOne({ where: { id } });
        if (!avatar)
            throw new common_1.BadRequestException('Avatar not found');
        const dataTransfer = Buffer.from(dto.data, 'base64');
        avatar.data = dataTransfer;
        console.log('dataTransfer', dataTransfer);
        avatar.altTexts = dto.altTexts;
        avatar.merchantId = dto.merchantId;
        return await this.avatar2DRepository.save(avatar);
    }
    async find(query) {
        return await this.avatar2DRepository.find(query);
    }
    async findOne(query) {
        return await this.avatar2DRepository.findOne(query);
    }
    async replace(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Id is required');
        const avatar = await this.findOne({ where: { id } });
        if (!avatar)
            throw new common_1.BadRequestException('Avatar not found');
        avatar.data = dto.data;
        avatar.altTexts = dto.altTexts;
        avatar.merchantId = dto.merchantId;
        return await this.avatar2DRepository.save(avatar);
    }
};
exports.AvatarService = AvatarService;
exports.AvatarService = AvatarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Avatar)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AvatarService);
let MerchantService = class MerchantService {
    constructor(merchantRepository, socialLinkService, avatar2DService, templateService, userService) {
        this.merchantRepository = merchantRepository;
        this.socialLinkService = socialLinkService;
        this.avatar2DService = avatar2DService;
        this.templateService = templateService;
        this.userService = userService;
    }
    async create(dto) {
        if (!dto.userId)
            throw new common_1.BadRequestException('User id is required');
        const user = await this.userService.findOne({
            where: {
                id: dto.userId
            }
        });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        let merchant = new entities_1.Merchant();
        if (dto.name)
            merchant.name = dto.name;
        if (dto.address)
            merchant.address = dto.address;
        if (dto.description)
            merchant.description = dto.description;
        if (dto.slogan)
            merchant.slogan = dto.slogan;
        if (dto.phone)
            merchant.phone = dto.phone;
        if (dto.email)
            merchant.email = dto.email;
        merchant = await this.merchantRepository.save(merchant);
        await this.userService.update(user.id, {
            merchantId: merchant.id
        });
        return merchant;
    }
    async delete(id) {
        return await this.merchantRepository.delete(id);
    }
    async find(query) {
        return await this.merchantRepository.find(query);
    }
    async findOne(query) {
        return await this.merchantRepository.findOne(query);
    }
    async replace(id, dto) {
        const socialLinks = await Promise.all(dto?.socialLinks.map(async (socialLink) => {
            return await this.socialLinkService.update(socialLink?.id, {
                data: socialLink?.data,
                provider: socialLink?.provider,
                merchantId: id,
            });
        }));
        return await this.merchantRepository.save({
            id,
            name: dto?.name,
            address: dto?.address,
            description: dto?.description,
            numberOfLikes: dto?.numberOfLikes,
            numberOfProducts: dto?.numberOfProducts,
            slogan: dto?.slogan,
            phone: dto?.phone,
            socialLinks,
        });
    }
    async update(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Id is required');
        const merchant = await this.findOne({ where: { id } });
        if (!merchant)
            throw new common_1.BadRequestException('Merchant not found');
        if (dto.avatar && dto.avatar.data) {
            let avatar = await this.avatar2DService.findOne({
                where: {
                    merchantId: id,
                },
            });
            if (!avatar) {
                avatar = await this.avatar2DService.create(dto.avatar);
            }
            else {
                avatar = await this.avatar2DService.update(avatar.id, dto.avatar);
            }
            merchant.avatar = avatar;
        }
        if (dto.socialLinks && dto.socialLinks.length > 0) {
            const socialLinks = [];
            for (const socialLink of dto.socialLinks) {
                if (!socialLink.provider || !socialLink.data)
                    continue;
                const socialLinkEntity = await this.socialLinkService.findOne({
                    where: {
                        merchantId: id,
                        provider: socialLink.provider,
                    }
                });
                socialLinkEntity.data = socialLink?.data;
                socialLinkEntity.provider = socialLink?.provider;
                socialLinkEntity.merchantId = id;
                if (socialLinkEntity) {
                    socialLinks.push(await this.socialLinkService.update(socialLinkEntity.id, socialLinkEntity));
                }
                else {
                    socialLinks.push(await this.socialLinkService.create({
                        data: socialLink?.data,
                        provider: socialLink?.provider,
                        merchantId: id,
                    }));
                }
            }
            merchant.socialLinks = socialLinks;
        }
        if (dto.id)
            merchant.id = dto.id;
        if (dto.name)
            merchant.name = dto.name;
        if (dto.address)
            merchant.address = dto.address;
        if (dto.description)
            merchant.description = dto.description;
        if (dto.slogan)
            merchant.slogan = dto.slogan;
        if (dto.numberOfLikes)
            merchant.numberOfLikes = dto.numberOfLikes;
        if (dto.numberOfProducts)
            merchant.numberOfProducts = dto.numberOfProducts;
        if (dto.email)
            merchant.email = dto.email;
        if (dto.phone)
            merchant.phone = dto.phone;
        if (dto.usingTemplateProfileCardId)
            merchant.usingTemplateProfileCardId = dto.usingTemplateProfileCardId;
        return await this.merchantRepository
            .save(merchant);
    }
    async addTemplate(merchantId, templateId) {
        const merchant = await this.findOne({
            where: { id: merchantId },
            relations: ['templates']
        });
        if (!merchant)
            throw new common_1.BadRequestException('Merchant not found');
        const template = await this.templateService.findOne({ where: { id: templateId } });
        if (!template)
            throw new common_1.BadRequestException('Template not found');
        merchant.templates = merchant.templates || [];
        merchant.templates.push(template);
        return await this.merchantRepository.save(merchant);
    }
    async removeTemplate(merchantId, templateId) {
        const merchant = await this.findOne({
            where: { id: merchantId },
            relations: ['templates']
        });
        if (!merchant)
            throw new common_1.BadRequestException('Merchant not found');
        const template = await this.templateService.findOne({ where: { id: templateId } });
        if (!template)
            throw new common_1.BadRequestException('Template not found');
        merchant.templates = merchant.templates || [];
        merchant.templates = merchant.templates.filter(t => t.id !== templateId);
        return await this.merchantRepository.save(merchant);
    }
};
exports.MerchantService = MerchantService;
exports.MerchantService = MerchantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Merchant)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => SocialLinkService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => AvatarService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => template_service_1.TemplateService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_1.UserService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        SocialLinkService,
        AvatarService,
        template_service_1.TemplateService,
        user_1.UserService])
], MerchantService);
//# sourceMappingURL=merchant.service.js.map