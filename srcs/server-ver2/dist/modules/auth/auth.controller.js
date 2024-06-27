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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const gaurds_1 = require("./gaurds");
const config_1 = require("@nestjs/config");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(grvdConfig, authService) {
        this.grvdConfig = grvdConfig;
        this.authService = authService;
        this.server = this.grvdConfig.get('server', { infer: true });
        this.client = this.grvdConfig.get('client', { infer: true });
    }
    async index() {
        return { message: 'Auth module' };
    }
    async login(req) {
        return this.authService.login(req);
    }
    async logout(req, res, next) {
        this.authService.logout(req, res);
        return {
            url: `http://localhost:3000/homepage/login`
        };
    }
    async googleAuth(req) {
        return { message: 'Google auth' };
    }
    googleAuthRedirect(req) {
        return {
            url: `http://localhost:3000/dashboard`
        };
    }
    async facebookAuth(req) {
        return { message: 'Facebook auth' };
    }
    facebookAuthRedirect(req) {
        return {
            url: 'auth/login/success'
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, common_1.Redirect)('http://localhost:3000/homepage/login', common_1.HttpStatus.FOUND),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(gaurds_1.GoogleOAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(gaurds_1.GoogleOAuthGuard),
    (0, common_1.Redirect)(`http://localhost:8000/auth/login/success`, common_1.HttpStatus.FOUND),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Get)('facebook'),
    (0, common_1.UseGuards)(gaurds_1.FacebookOAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookAuth", null);
__decorate([
    (0, common_1.Get)('facebook/callback'),
    (0, common_1.UseGuards)(gaurds_1.FacebookOAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "facebookAuthRedirect", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map