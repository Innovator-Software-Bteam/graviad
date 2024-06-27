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
exports.UpdateTemplateDTO = exports.CreateTemplateDTO = void 0;
const template_1 = require("..");
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
class CreateTemplateDTO {
}
exports.CreateTemplateDTO = CreateTemplateDTO;
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.id !== undefined, { message: 'Id must be a number' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Id must be a number' }),
    __metadata("design:type", Number)
], CreateTemplateDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    __metadata("design:type", String)
], CreateTemplateDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.objectType !== undefined, { message: 'Object type must be a valid object type' }),
    (0, class_validator_1.IsEnum)({ ObjectType: template_1.ObjectType }, { message: 'Object type must be a valid object type' }),
    __metadata("design:type", String)
], CreateTemplateDTO.prototype, "objectType", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.templateType !== undefined, { message: 'Template type must be a valid template type' }),
    (0, class_validator_1.IsEnum)({ TemplateType: template_1.TemplateType }, { message: 'Template type must be a valid template type' }),
    __metadata("design:type", String)
], CreateTemplateDTO.prototype, "templateType", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.description !== undefined, { message: 'Description must be a string' }),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    __metadata("design:type", String)
], CreateTemplateDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.brief !== undefined, { message: 'Brief must be a string' }),
    (0, class_validator_1.IsString)({ message: 'Brief must be a string' }),
    __metadata("design:type", String)
], CreateTemplateDTO.prototype, "brief", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.numberOfLikes !== undefined, { message: 'Number of likes must be a number' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Number of likes must be a number' }),
    __metadata("design:type", Number)
], CreateTemplateDTO.prototype, "numberOfLikes", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.version !== undefined, { message: 'Version must be a string' }),
    (0, class_validator_1.IsString)({ message: 'Version must be a string' }),
    __metadata("design:type", String)
], CreateTemplateDTO.prototype, "version", void 0);
class UpdateTemplateDTO extends (0, mapped_types_1.PartialType)(CreateTemplateDTO) {
}
exports.UpdateTemplateDTO = UpdateTemplateDTO;
//# sourceMappingURL=template.dto.js.map