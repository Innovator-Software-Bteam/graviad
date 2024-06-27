import { Template } from "./entities";
import { Repository } from "typeorm";
import { IDatabaseCRUD, IQuery } from "@app/interfaces";
import { CreateTemplateDTO, UpdateTemplateDTO } from "@app/modules/template/dto/template.dto";
export declare class TemplateService implements IDatabaseCRUD<Template, CreateTemplateDTO, UpdateTemplateDTO> {
    private readonly templateRepository;
    constructor(templateRepository: Repository<Template>);
    create(dto?: CreateTemplateDTO): Promise<Template>;
    delete(id: number): Promise<Template>;
    find(query: IQuery): Promise<Template[]>;
    findOne(query: IQuery): Promise<Template>;
    replace(id: number, dto?: CreateTemplateDTO): Promise<Template>;
    update(id: number, dto?: UpdateTemplateDTO): Promise<Template>;
}
