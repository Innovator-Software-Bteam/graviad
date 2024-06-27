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
exports.MerchantController = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("../auth");
const merchant_service_1 = require("./merchant.service");
const dto_1 = require("./dto");
let MerchantController = class MerchantController {
    constructor(merchantService, socialLinkService) {
        this.merchantService = merchantService;
        this.socialLinkService = socialLinkService;
    }
    async list(query) {
        return await this.merchantService
            .find(query);
    }
    async findBy(id, query) {
        return await this.merchantService
            .findOne({
            ...query,
            where: {
                id,
                ...query.where
            },
        });
    }
    async getAvatar(id, res) {
        const merchant = await this.merchantService.findOne({
            where: {
                id,
            },
            relations: ['avatar'],
        });
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': merchant.avatar.data.length,
        });
        res.end(merchant.avatar.data);
    }
    async getRelation(id, relation) {
        try {
            const merchant = await this.merchantService.findOne({
                where: {
                    id,
                },
                relations: [relation],
            });
            return merchant[relation];
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async create(body) {
        return this.merchantService
            .create(body);
    }
    async addTemplate(id, templateId) {
        return this.merchantService
            .addTemplate(id, templateId);
    }
    async removeTemplate(id, templateId) {
        return this.merchantService
            .removeTemplate(id, templateId);
    }
    async replace(id, body) {
        console.log(id, body);
        if (!id || !body) {
            throw new common_1.BadRequestException('Email and body must be provided');
        }
        return await this.merchantService
            .replace(id, body);
    }
    async update(id, body) {
        return this.merchantService
            .update(id, body);
    }
    async remove(email) {
        return this.merchantService
            .delete(email)
            .then(() => this.socialLinkService.delete(email));
    }
};
exports.MerchantController = MerchantController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "findBy", null);
__decorate([
    (0, common_1.Get)(':id/avatar.png'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "getAvatar", null);
__decorate([
    (0, common_1.Get)(':id/:relation'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('relation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "getRelation", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/add-template/:templateId'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('templateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "addTemplate", null);
__decorate([
    (0, common_1.Post)(':id/remove-template/:templateId'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('templateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "removeTemplate", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateMerchantDto]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "replace", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateMerchantDto]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':email'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MerchantController.prototype, "remove", null);
exports.MerchantController = MerchantController = __decorate([
    (0, common_1.Controller)('merchants'),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => merchant_service_1.MerchantService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => merchant_service_1.SocialLinkService))),
    __metadata("design:paramtypes", [merchant_service_1.MerchantService,
        merchant_service_1.SocialLinkService])
], MerchantController);
//# sourceMappingURL=merchant.controller.js.map