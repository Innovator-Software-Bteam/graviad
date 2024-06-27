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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const dto_1 = require("./dto");
const guards_1 = require("./guards");
const auth_1 = require("../auth");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async list(query) {
        return await this.userService
            .find(query);
    }
    async getRelation(id, relation) {
        try {
            const user = await this.userService.findOne({
                where: {
                    id,
                },
                relations: [relation]
            });
            return user[relation];
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async search(query) {
        return await this.userService
            .findOne(query);
    }
    async get(id, query) {
        return await this.userService.findOne({
            ...query,
            where: {
                id: id,
                ...query.where
            }
        });
    }
    async create(body) {
        return await this.userService
            .create(body);
    }
    async likeProduct(id, product_id) {
        return await this.userService
            .likeProduct(id, product_id);
    }
    async unlikeProduct(id, product_id) {
        return await this.userService
            .unlikeProduct(id, product_id);
    }
    async followMerchant(id, merchant_id) {
        return await this.userService
            .followMerchant(id, merchant_id);
    }
    async unfollowMerchant(id, merchant_id) {
        return await this.userService
            .unfollowMerchant(id, merchant_id);
    }
    async update(id, body) {
        return await this.userService
            .update(id, body);
    }
    async delete(id) {
        return await this.userService
            .delete(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id/:relation'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('relation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getRelation", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/like_product/:product_id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "likeProduct", null);
__decorate([
    (0, common_1.Post)(':id/unlike_product/:product_id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unlikeProduct", null);
__decorate([
    (0, common_1.Post)(':id/follow_merchant/:merchant_id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('merchant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "followMerchant", null);
__decorate([
    (0, common_1.Delete)(':id/unfollow_merchant/:merchant_id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('merchant_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unfollowMerchant", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    (0, common_1.UseGuards)(guards_1.UserGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_1.AuthGuard),
    (0, common_1.UseGuards)(guards_1.UserGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map