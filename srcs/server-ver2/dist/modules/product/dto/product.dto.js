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
exports.UpdateProductDTO = exports.CreateProductDTO = exports.UpdateProductFeatureDTO = exports.CreateProductFeatureDTO = void 0;
const dto_1 = require("./");
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateProductFeatureDTO {
}
exports.CreateProductFeatureDTO = CreateProductFeatureDTO;
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Id must be a number' }),
    __metadata("design:type", Number)
], CreateProductFeatureDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Product id must be a number' }),
    __metadata("design:type", Number)
], CreateProductFeatureDTO.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.Length)(1, 20, { message: 'Name must be between 1 and 20 characters' }),
    __metadata("design:type", String)
], CreateProductFeatureDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    (0, class_validator_1.Max)(100, { message: 'Description must be less than 60 characters' }),
    __metadata("design:type", String)
], CreateProductFeatureDTO.prototype, "description", void 0);
class UpdateProductFeatureDTO extends (0, mapped_types_1.PartialType)(CreateProductFeatureDTO) {
}
exports.UpdateProductFeatureDTO = UpdateProductFeatureDTO;
class CreateProductDTO {
}
exports.CreateProductDTO = CreateProductDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Id must be a number' }),
    __metadata("design:type", Number)
], CreateProductDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.Length)(1, 20, { message: 'Name must be between 1 and 20 characters' }),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Version must be a string' }),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "version", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "link", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Brief must be a string' }),
    (0, class_validator_1.Length)(1, 100, { message: 'Brief must be between 1 and 100 characters' }),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "brief", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateProductDTO.prototype, "dateRelease", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Highlight label must be a string' }),
    (0, class_validator_1.Length)(1, 20, { message: 'Highlight label must be between 1 and 20 characters' }),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "highlightLabel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Number of likes must be a number' }),
    __metadata("design:type", Number)
], CreateProductDTO.prototype, "numberOfLikes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)({ message: 'Thumbnail 2D must be an object' }),
    __metadata("design:type", dto_1.CreateProductThumbnailDTO)
], CreateProductDTO.prototype, "thumbnail2D", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)({ message: 'MediaContext from spline must be an object' }),
    __metadata("design:type", dto_1.CreateProductMediaFromSplineDTO)
], CreateProductDTO.prototype, "mediaFromSpline", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Features must be an array' }),
    __metadata("design:type", Array)
], CreateProductDTO.prototype, "features", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Liked by ids must be an array' }),
    __metadata("design:type", Array)
], CreateProductDTO.prototype, "likedByIds", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Merchant id must be a string' }),
    __metadata("design:type", String)
], CreateProductDTO.prototype, "merchantId", void 0);
class UpdateProductDTO extends (0, mapped_types_1.PartialType)(CreateProductDTO) {
}
exports.UpdateProductDTO = UpdateProductDTO;
//# sourceMappingURL=product.dto.js.map