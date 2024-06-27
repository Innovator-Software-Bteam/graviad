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
exports.User = exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const merchant_1 = require("../../merchant");
const product_1 = require("../../product");
let Profile = class Profile {
};
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', nullable: false, name: 'id' }),
    __metadata("design:type", String)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, name: 'provider' }),
    __metadata("design:type", String)
], Profile.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: false, name: 'data' }),
    __metadata("design:type", Object)
], Profile.prototype, "data", void 0);
exports.Profile = Profile = __decorate([
    (0, typeorm_1.Entity)('profiles')
], Profile);
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, name: 'email' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Profile),
    (0, typeorm_1.JoinColumn)({ name: 'profile_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_users_profiles' }),
    __metadata("design:type", Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, name: 'profile_id' }),
    __metadata("design:type", String)
], User.prototype, "profileId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => merchant_1.Merchant, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'merchant_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_users_merchant_id' }),
    __metadata("design:type", merchant_1.Merchant)
], User.prototype, "merchant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true, name: 'merchant_id' }),
    __metadata("design:type", String)
], User.prototype, "merchantId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_1.Product, product => product.likedBy),
    __metadata("design:type", Array)
], User.prototype, "likedProducts", void 0);
__decorate([
    (0, typeorm_1.RelationId)((user) => user.likedProducts),
    __metadata("design:type", Array)
], User.prototype, "likedProductIds", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => merchant_1.Merchant, merchant => merchant.followers),
    (0, typeorm_1.JoinTable)({
        name: 'users_follow_merchants',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'users_follow_merchants_user_id_fkey',
        },
        inverseJoinColumn: {
            name: 'merchant_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'users_follow_merchants_merchant_id_fkey'
        }
    }),
    __metadata("design:type", Array)
], User.prototype, "followingMerchants", void 0);
__decorate([
    (0, typeorm_1.RelationId)((user) => user.followingMerchants),
    __metadata("design:type", Array)
], User.prototype, "followingMerchantIds", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map