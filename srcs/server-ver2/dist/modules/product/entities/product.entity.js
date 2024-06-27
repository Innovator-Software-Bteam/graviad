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
exports.ProductFeature = exports.Product = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../../user");
const productMedia_entity_1 = require("./productMedia.entity");
const merchant_1 = require("../../merchant");
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'price' }),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, name: 'name' }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'description' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'version' }),
    __metadata("design:type", String)
], Product.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'link' }),
    __metadata("design:type", String)
], Product.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'brief' }),
    __metadata("design:type", String)
], Product.prototype, "brief", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, name: 'date_release' }),
    __metadata("design:type", Date)
], Product.prototype, "dateRelease", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'highlight_label' }),
    __metadata("design:type", String)
], Product.prototype, "highlightLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'number_of_likes' }),
    __metadata("design:type", Number)
], Product.prototype, "numberOfLikes", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => productMedia_entity_1.ProductThumbnail2D, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'thumbnail_id' }),
    __metadata("design:type", productMedia_entity_1.ProductThumbnail2D)
], Product.prototype, "thumbnail2D", void 0);
__decorate([
    (0, typeorm_1.RelationId)((product) => product.thumbnail2D),
    __metadata("design:type", Number)
], Product.prototype, "thumbnail2DId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false, name: 'merchant_id' }),
    __metadata("design:type", String)
], Product.prototype, "merchantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => merchant_1.Merchant, merchant => merchant.products),
    (0, typeorm_1.JoinColumn)({ name: 'merchant_id' }),
    __metadata("design:type", merchant_1.Merchant)
], Product.prototype, "merchant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductFeature, ProductFeature => ProductFeature.product, { cascade: true }),
    __metadata("design:type", Array)
], Product.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.RelationId)((product) => product.features),
    __metadata("design:type", Array)
], Product.prototype, "featureIds", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => productMedia_entity_1.ProductMediaFromSpline, ProductMediaFromSpline => ProductMediaFromSpline.product, { cascade: true }),
    __metadata("design:type", productMedia_entity_1.ProductMediaFromSpline)
], Product.prototype, "mediaFromSpline", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_1.User, user => user.likedProducts, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'users_like_products',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    }),
    __metadata("design:type", Array)
], Product.prototype, "likedBy", void 0);
__decorate([
    (0, typeorm_1.RelationId)((product) => product.likedBy),
    __metadata("design:type", Array)
], Product.prototype, "likedByIds", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
let ProductFeature = class ProductFeature {
};
exports.ProductFeature = ProductFeature;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], ProductFeature.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, name: 'name' }),
    __metadata("design:type", String)
], ProductFeature.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, name: 'description' }),
    __metadata("design:type", String)
], ProductFeature.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product, product => product.features),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", Product)
], ProductFeature.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.RelationId)((feature) => feature.product),
    __metadata("design:type", Number)
], ProductFeature.prototype, "productId", void 0);
exports.ProductFeature = ProductFeature = __decorate([
    (0, typeorm_1.Entity)('product_features')
], ProductFeature);
//# sourceMappingURL=product.entity.js.map