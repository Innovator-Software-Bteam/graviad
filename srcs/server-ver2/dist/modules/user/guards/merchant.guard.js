"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantGuard = void 0;
const common_1 = require("@nestjs/common");
let MerchantGuard = class MerchantGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            throw new common_1.BadRequestException('Unauthorized');
        }
        if (request.user.id !== request.params.id || request.user.email !== request.params.email || request.user.email !== request.body.email) {
            throw new common_1.BadRequestException('Require owner permission');
        }
        return true;
    }
};
exports.MerchantGuard = MerchantGuard;
exports.MerchantGuard = MerchantGuard = __decorate([
    (0, common_1.Injectable)()
], MerchantGuard);
//# sourceMappingURL=merchant.guard.js.map