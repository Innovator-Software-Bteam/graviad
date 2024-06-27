"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const database_config_1 = __importDefault(require("./config/database.config"));
const typeorm_1 = require("@nestjs/typeorm");
const user_1 = require("./modules/user");
const auth_module_1 = require("./modules/auth/auth.module");
const graviad_config_1 = __importDefault(require("./config/graviad.config"));
const product_module_1 = require("./modules/product/product.module");
const merchant_1 = require("./modules/merchant");
const template_module_1 = require("./modules/template/template.module");
const template_controller_1 = require("./modules/template/template.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env.production'],
                isGlobal: true,
                load: [database_config_1.default, graviad_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRoot((0, database_config_1.default)()),
            user_1.UserModule,
            auth_module_1.AuthModule,
            product_module_1.ProductModule,
            merchant_1.MerchantModule,
            template_module_1.TemplateModule
        ],
        controllers: [app_controller_1.AppController, template_controller_1.TemplateController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map