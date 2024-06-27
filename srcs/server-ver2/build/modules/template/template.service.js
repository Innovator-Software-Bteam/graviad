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
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("./entities");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let TemplateService = class TemplateService {
    constructor(templateRepository) {
        this.templateRepository = templateRepository;
    }
    async create(dto) {
        return await this.templateRepository.save(dto);
    }
    async delete(id) {
        if (!id)
            throw new common_1.BadRequestException('Id is required');
        await this.templateRepository.delete(id);
        return await this.templateRepository.findOne({
            where: { id }
        });
    }
    async find(query) {
        return await this.templateRepository.find(query);
    }
    async findOne(query) {
        return await this.templateRepository.findOne(query);
    }
    async replace(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Id is required');
        await this.templateRepository.update(id, dto);
        return await this.templateRepository.findOne({
            where: { id }
        });
    }
    async update(id, dto) {
        if (!id)
            throw new common_1.BadRequestException('Id is required');
        const template = await this.templateRepository.findOne({
            where: { id }
        });
        if (!template)
            throw new common_1.BadRequestException('Template not found');
        for (const key in dto) {
            template[key] = dto[key];
        }
        return await this.templateRepository.save(template);
    }
};
exports.TemplateService = TemplateService;
exports.TemplateService = TemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Template)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TemplateService);
//# sourceMappingURL=template.service.js.map