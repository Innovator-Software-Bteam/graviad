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
exports.ProductMediaFromSpline = exports.ProductThumbnail2D = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductThumbnail2D = class ProductThumbnail2D {
};
exports.ProductThumbnail2D = ProductThumbnail2D;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], ProductThumbnail2D.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, name: 'alt_texts', array: true }),
    __metadata("design:type", Array)
], ProductThumbnail2D.prototype, "altTexts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea', nullable: false, name: 'data' }),
    __metadata("design:type", Object)
], ProductThumbnail2D.prototype, "data", void 0);
exports.ProductThumbnail2D = ProductThumbnail2D = __decorate([
    (0, typeorm_1.Entity)('product_thumbnail_2d')
], ProductThumbnail2D);
let ProductMediaFromSpline = class ProductMediaFromSpline {
};
exports.ProductMediaFromSpline = ProductMediaFromSpline;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int', nullable: false, name: 'id' }),
    __metadata("design:type", Number)
], ProductMediaFromSpline.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, name: 'data' }),
    __metadata("design:type", Object)
], ProductMediaFromSpline.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => product_entity_1.Product, product => product.mediaFromSpline),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], ProductMediaFromSpline.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.RelationId)((productMediaFromSpline) => productMediaFromSpline.product),
    __metadata("design:type", Number)
], ProductMediaFromSpline.prototype, "productId", void 0);
exports.ProductMediaFromSpline = ProductMediaFromSpline = __decorate([
    (0, typeorm_1.Entity)('product_media_from_spline')
], ProductMediaFromSpline);
//# sourceMappingURL=productMedia.entity.js.map