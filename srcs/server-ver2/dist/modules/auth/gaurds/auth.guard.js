"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
class AuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated();
    }
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map