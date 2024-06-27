"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantModule = void 0;
const common_1 = require("@nestjs/common");
const merchant_service_1 = require("./merchant.service");
const merchant_controller_1 = require("./merchant.controller");
const entities_1 = require("./entities");
const typeorm_1 = require("@nestjs/typeorm");
const template_module_1 = require("../template/template.module");
const user_1 = require("../user");
let MerchantModule = class MerchantModule {
};
exports.MerchantModule = MerchantModule;
exports.MerchantModule = MerchantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.Avatar,
                entities_1.SocialLink,
                entities_1.Merchant,
            ]),
            (0, common_1.forwardRef)(() => user_1.UserModule),
            template_module_1.TemplateModule,
        ],
        providers: [merchant_service_1.MerchantService, merchant_service_1.AvatarService, merchant_service_1.SocialLinkService],
        controllers: [merchant_controller_1.MerchantController],
        exports: [merchant_service_1.MerchantService, merchant_service_1.AvatarService, merchant_service_1.SocialLinkService],
    })
], MerchantModule);
//# sourceMappingURL=merchant.module.js.map