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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const product_1 = require("..");
const user_1 = require("../../user");
const merchant_1 = require("../../merchant");
let OwnerGuard = class OwnerGuard {
    constructor(reflector, productService, merchantService, userService) {
        this.reflector = reflector;
        this.productService = productService;
        this.merchantService = merchantService;
        this.userService = userService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            return false;
        }
        const user = await this.userService.findOne({
            where: {
                email: request.user.email
            }
        });
        const productId = request.params.id;
        const merchant = await this.merchantService.findOne({
            where: {
                userId: user.id
            }
        });
        if (!user || !merchant) {
            return false;
        }
        return this.productService.findOne(productId).then((product) => {
            return product && product.merchantId === merchant.id;
        });
    }
};
exports.OwnerGuard = OwnerGuard;
exports.OwnerGuard = OwnerGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        product_1.ProductService,
        merchant_1.MerchantService,
        user_1.UserService])
], OwnerGuard);
//# sourceMappingURL=owner.guard.js.map