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
exports.UpdateSocialLinkDto = exports.CreateSocialLinkDto = exports.UpdateMerchantDto = exports.CreateMerchantDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const property_dto_1 = require("../../user/dto/property.dto");
class CreateMerchantDto {
}
exports.CreateMerchantDto = CreateMerchantDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateMerchantDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    __metadata("design:type", String)
], CreateMerchantDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    __metadata("design:type", String)
], CreateMerchantDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    __metadata("design:type", String)
], CreateMerchantDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 100, { message: 'Slogan must be between 1 and 100 characters' }),
    __metadata("design:type", String)
], CreateMerchantDto.prototype, "slogan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Address must be a string' }),
    __metadata("design:type", String)
], CreateMerchantDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Phone must be a string' }),
    __metadata("design:type", String)
], CreateMerchantDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Social links must be an array' }),
    __metadata("design:type", Array)
], CreateMerchantDto.prototype, "socialLinks", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Number of likes must be a number' }),
    __metadata("design:type", Number)
], CreateMerchantDto.prototype, "numberOfLikes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Number of products must be a number' }),
    __metadata("design:type", Number)
], CreateMerchantDto.prototype, "numberOfProducts", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", property_dto_1.CreateAvatarDTO)
], CreateMerchantDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMerchantDto.prototype, "usingTemplateProfileCardId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMerchantDto.prototype, "userId", void 0);
class UpdateMerchantDto extends (0, mapped_types_1.PartialType)(CreateMerchantDto) {
}
exports.UpdateMerchantDto = UpdateMerchantDto;
class CreateSocialLinkDto {
}
exports.CreateSocialLinkDto = CreateSocialLinkDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Data is required' }),
    __metadata("design:type", String)
], CreateSocialLinkDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Data is required' }),
    __metadata("design:type", String)
], CreateSocialLinkDto.prototype, "data", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSocialLinkDto.prototype, "merchantId", void 0);
class UpdateSocialLinkDto extends (0, mapped_types_1.PartialType)(CreateSocialLinkDto) {
}
exports.UpdateSocialLinkDto = UpdateSocialLinkDto;
//# sourceMappingURL=merchant.dto.js.map