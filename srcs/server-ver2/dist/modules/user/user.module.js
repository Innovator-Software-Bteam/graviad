"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const entities_1 = require("./entities");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const product_module_1 = require("../product/product.module");
const merchant_1 = require("../merchant");
const template_module_1 = require("../template/template.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.Profile,
                entities_1.User,
            ]),
            product_module_1.ProductModule,
            merchant_1.MerchantModule,
            template_module_1.TemplateModule
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_service_1.ProfileService],
        exports: [user_service_1.UserService, user_service_1.ProfileService]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map