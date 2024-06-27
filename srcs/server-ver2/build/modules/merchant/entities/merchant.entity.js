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
exports.SocialLink = exports.Merchant = void 0;
const typeorm_1 = require("typeorm");
const property_entity_1 = require("./property.entity");
const entities_1 = require("../../product/entities");
const entities_2 = require("../../template/entities");
const user_1 = require("../../user");
let Merchant = class Merchant {
};
exports.Merchant = Merchant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Merchant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'phone' }),
    __metadata("design:type", String)
], Merchant.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'address' }),
    __metadata("design:type", String)
], Merchant.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'name', unique: true }),
    __metadata("design:type", String)
], Merchant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'email', unique: true }),
    __metadata("design:type", String)
], Merchant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'description' }),
    __metadata("design:type", String)
], Merchant.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'slogan' }),
    __metadata("design:type", String)
], Merchant.prototype, "slogan", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'number_of_likes' }),
    __metadata("design:type", Number)
], Merchant.prototype, "numberOfLikes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'number_of_products' }),
    __metadata("design:type", Number)
], Merchant.prototype, "numberOfProducts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SocialLink, socialLink => socialLink.merchant, { cascade: true }),
    __metadata("design:type", Array)
], Merchant.prototype, "socialLinks", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_1.User, user => user.merchant),
    __metadata("design:type", user_1.User)
], Merchant.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.RelationId)((merchant) => merchant.user),
    __metadata("design:type", String)
], Merchant.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => property_entity_1.Avatar, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'avatar_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_merchants_avatar_id' }),
    __metadata("design:type", property_entity_1.Avatar)
], Merchant.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => entities_1.Product, product => product.merchant, { cascade: true }),
    __metadata("design:type", Array)
], Merchant.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => entities_1.Product, product => product.likedBy),
    __metadata("design:type", Array)
], Merchant.prototype, "likedProducts", void 0);
__decorate([
    (0, typeorm_1.RelationId)((merchant) => merchant.likedProducts),
    __metadata("design:type", Array)
], Merchant.prototype, "likedProductIds", void 0);
__decorate([
    (0, typeorm_1.RelationId)((merchant) => merchant.templates),
    __metadata("design:type", Array)
], Merchant.prototype, "templateIds", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_1.User, user => user.followingMerchants, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'users_follow_merchants',
        joinColumn: {
            name: 'merchant_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'users_follow_merchants_merchant_id_fkey',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'users_follow_merchants_user_id_fkey'
        }
    }),
    __metadata("design:type", Array)
], Merchant.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.RelationId)((merchant) => merchant.followers),
    __metadata("design:type", Array)
], Merchant.prototype, "followerIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'created_at' }),
    __metadata("design:type", Date)
], Merchant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'updated_at' }),
    __metadata("design:type", Date)
], Merchant.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
        name: 'using_template_profile_card_id',
        foreignKeyConstraintName: 'merchants_using_template_profile_card_id_fkey'
    }),
    __metadata("design:type", Number)
], Merchant.prototype, "usingTemplateProfileCardId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => entities_2.Template, template => template, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'merchants_have_templates',
        joinColumn: {
            name: 'merchant_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'merchants_have_templates_merchant_id_fkey',
        },
        inverseJoinColumn: {
            name: 'template_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'merchants_have_templates_template_id_fkey'
        }
    }),
    __metadata("design:type", Array)
], Merchant.prototype, "templates", void 0);
exports.Merchant = Merchant = __decorate([
    (0, typeorm_1.Entity)('merchants')
], Merchant);
let SocialLink = class SocialLink {
};
exports.SocialLink = SocialLink;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int', nullable: false, name: 'id' }),
    __metadata("design:type", Number)
], SocialLink.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, name: 'provider' }),
    __metadata("design:type", String)
], SocialLink.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, name: 'data', default: '' }),
    __metadata("design:type", String)
], SocialLink.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Merchant, merchant => merchant.socialLinks),
    (0, typeorm_1.JoinColumn)({
        name: 'merchant_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_social_links_merchants'
    }),
    __metadata("design:type", Merchant)
], SocialLink.prototype, "merchant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false, name: 'merchant_id', foreignKeyConstraintName: 'fk_social_links_merchants' }),
    __metadata("design:type", String)
], SocialLink.prototype, "merchantId", void 0);
exports.SocialLink = SocialLink = __decorate([
    (0, typeorm_1.Entity)('social_links'),
    (0, typeorm_1.Unique)(['provider', 'merchantId'])
], SocialLink);
//# sourceMappingURL=merchant.entity.js.map