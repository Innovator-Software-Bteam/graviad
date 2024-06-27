import {Body, Controller, Delete, forwardRef, Get, Inject, Param, Patch, Post, Put, Query} from '@nestjs/common';
import {TemplateService} from "@app/modules/template/template.service";
import {IQuery} from "@app/interfaces";
import {CreateTemplateDTO} from "@app/modules/template/dto/template.dto";

@Controller('templates')
export class TemplateController {
    constructor(
        @Inject(forwardRef(() => TemplateService))
        private readonly templateService: TemplateService
    ) {
    }

    @Get()
    async list(@Query() query: IQuery) {
        return await this.templateService.find(query);
    }

    @Get(':id')
    async get(@Query() query: IQuery, @Param('id') id: number){
        return await this.templateService.findOne({
            ...query,
            where: {
                id: id,
                ...query.where
            }
        });
    }

    @Post()
    async create(@Body() body: CreateTemplateDTO) {
        return await this.templateService.create(body);
    }

    @Put(':id')
    async update(@Body() body: CreateTemplateDTO) {
        return await this.templateService.update(body.id, body);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.templateService.delete(id);
    }

    @Patch(':id')
    async replace(@Body() body: CreateTemplateDTO) {
        return await this.templateService.replace(body.id, body);
    }
}
