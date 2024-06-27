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
exports.UpdateProfileDTO = exports.CreateProfileDTO = exports.UpdateAvatarDTO = exports.CreateAvatarDTO = void 0;
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
class CreateAvatarDTO {
}
exports.CreateAvatarDTO = CreateAvatarDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAvatarDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)({ message: 'Data is required' }),
    __metadata("design:type", Object)
], CreateAvatarDTO.prototype, "data", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateAvatarDTO.prototype, "altTexts", void 0);
class UpdateAvatarDTO extends (0, mapped_types_1.PartialType)(CreateAvatarDTO) {
}
exports.UpdateAvatarDTO = UpdateAvatarDTO;
class CreateProfileDTO {
}
exports.CreateProfileDTO = CreateProfileDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], CreateProfileDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)({ message: 'Data is required' }),
    __metadata("design:type", Object)
], CreateProfileDTO.prototype, "data", void 0);
class UpdateProfileDTO extends (0, mapped_types_1.PartialType)(CreateProfileDTO) {
}
exports.UpdateProfileDTO = UpdateProfileDTO;
//# sourceMappingURL=property.dto.js.map