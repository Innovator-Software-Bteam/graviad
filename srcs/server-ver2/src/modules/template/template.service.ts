import {BadRequestException, Injectable} from '@nestjs/common';
import {Template} from "./entities";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {IDatabaseCRUD, IQuery} from "@app/interfaces";
import {CreateTemplateDTO, UpdateTemplateDTO} from "@app/modules/template/dto/template.dto";

@Injectable()
export class TemplateService implements IDatabaseCRUD<Template, CreateTemplateDTO, UpdateTemplateDTO> {
    constructor(
        @InjectRepository(Template)
        private readonly templateRepository: Repository<Template>
    ) {
    }

    async create(dto?: CreateTemplateDTO): Promise<Template> {
        return await this.templateRepository.save(dto);
    }

    async delete(id: number): Promise<Template> {
        if (!id) throw new BadRequestException('Id is required');
        await this.templateRepository.delete(id);
        return await this.templateRepository.findOne({
            where: {id}
        });
    }

    async find(query: IQuery): Promise<Template[]> {
        return await this.templateRepository.find(query);
    }

    async findOne(query: IQuery): Promise<Template> {
        return await this.templateRepository.findOne(query);
    }

    async replace(id: number, dto?: CreateTemplateDTO): Promise<Template> {
        if (!id) throw new BadRequestException('Id is required');
        await this.templateRepository.update(id, dto);
        return await this.templateRepository.findOne({
            where: {id}
        });

    }

    async update(id: number, dto?: UpdateTemplateDTO): Promise<Template> {
        if (!id) throw new BadRequestException('Id is required');
        const template = await this.templateRepository.findOne({
            where: {id}
        });
        if (!template) throw new BadRequestException('Template not found');
        for (const key in dto) {
            template[key] = dto[key];
        }
        return await this.templateRepository.save(template);
    }

}
