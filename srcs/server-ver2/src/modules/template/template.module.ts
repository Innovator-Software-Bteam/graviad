import {Module} from '@nestjs/common';
import {TemplateController} from './template.controller';
import {TemplateService} from './template.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Template} from "@app/modules/template/entities/template.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Template,
        ])
    ],
    controllers: [TemplateController],
    providers: [TemplateService],
    exports: [TemplateService]
})
export class TemplateModule {
}
