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
exports.UpdateProductMediaFromSplineDTO = exports.CreateProductMediaFromSplineDTO = exports.UpdateProductThumbnailDTO = exports.CreateProductThumbnailDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
class CreateProductThumbnailDTO {
}
exports.CreateProductThumbnailDTO = CreateProductThumbnailDTO;
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Id must be a number' }),
    __metadata("design:type", Number)
], CreateProductThumbnailDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Data must be not empty' }),
    __metadata("design:type", Object)
], CreateProductThumbnailDTO.prototype, "data", void 0);
class UpdateProductThumbnailDTO extends (0, mapped_types_1.PartialType)(CreateProductThumbnailDTO) {
}
exports.UpdateProductThumbnailDTO = UpdateProductThumbnailDTO;
class CreateProductMediaFromSplineDTO {
}
exports.CreateProductMediaFromSplineDTO = CreateProductMediaFromSplineDTO;
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Id must be a number' }),
    __metadata("design:type", Number)
], CreateProductMediaFromSplineDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'Id must be a number' }),
    __metadata("design:type", Number)
], CreateProductMediaFromSplineDTO.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Data must be not empty' }),
    __metadata("design:type", String)
], CreateProductMediaFromSplineDTO.prototype, "data", void 0);
class UpdateProductMediaFromSplineDTO extends (0, mapped_types_1.PartialType)(CreateProductMediaFromSplineDTO) {
}
exports.UpdateProductMediaFromSplineDTO = UpdateProductMediaFromSplineDTO;
//# sourceMappingURL=productMedia.dto.js.map