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
exports.SessionSerializer = exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_1 = require("../user");
const auth_interface_1 = require("./auth.interface");
let AuthService = class AuthService {
    constructor() {
    }
    login(req) {
        const status = req.isAuthenticated();
        if (status) {
            return {
                message: auth_interface_1.AuthMessage.LOGIN_SUCCESS,
                user: req.user,
                status: status
            };
        }
        else {
            throw new common_1.ForbiddenException({
                message: auth_interface_1.AuthMessage.LOGIN_FAILED,
                status: status
            });
        }
    }
    logout(req, res) {
        try {
            req.logout(done => {
            });
            req.session.destroy((err) => {
                if (err) {
                }
                res.redirect('/');
            });
        }
        catch (e) {
        }
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AuthService.prototype, "login", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AuthService);
let SessionSerializer = class SessionSerializer extends passport_1.PassportSerializer {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    serializeUser(user, done) {
        done(null, user);
    }
    async deserializeUser(payload, done) {
        done(null, payload);
    }
};
exports.SessionSerializer = SessionSerializer;
exports.SessionSerializer = SessionSerializer = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_1.UserService))),
    __metadata("design:paramtypes", [user_1.UserService])
], SessionSerializer);
//# sourceMappingURL=auth.service.js.map