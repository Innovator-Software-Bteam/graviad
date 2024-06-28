import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import databaseConfig from "./config/database.config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "@app/modules/user";
import {AuthModule} from "@app/modules/auth/auth.module";
import graviadConfig from "./config/graviad.config";
import {ProductModule} from "@app/modules/product/product.module";
import {MerchantModule} from "@app/modules/merchant";
import { TemplateModule } from '@app/modules/template/template.module';
import {TemplateController} from "@app/modules/template/template.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.production'],
            isGlobal: true,
            load: [databaseConfig, graviadConfig],
        }),
        TypeOrmModule.forRoot(databaseConfig()),
        UserModule,
        AuthModule,
        ProductModule,
        MerchantModule,
        TemplateModule
    ],
    controllers: [AppController, TemplateController],
    providers: [AppService],
})
export class AppModule {
}
