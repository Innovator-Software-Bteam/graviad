import { TemplateService } from "@app/modules/template/template.service";
import { IQuery } from "@app/interfaces";
import { CreateTemplateDTO } from "@app/modules/template/dto/template.dto";
export declare class TemplateController {
    private readonly templateService;
    constructor(templateService: TemplateService);
    list(query: IQuery): Promise<import("./entities").Template[]>;
    get(query: IQuery, id: number): Promise<import("./entities").Template>;
    create(body: CreateTemplateDTO): Promise<import("./entities").Template>;
    update(body: CreateTemplateDTO): Promise<import("./entities").Template>;
    delete(id: number): Promise<import("./entities").Template>;
    replace(body: CreateTemplateDTO): Promise<import("./entities").Template>;
}
