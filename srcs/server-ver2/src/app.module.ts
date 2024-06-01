import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import databaseConfig from "./config/database.config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "@app/modules/user";
import {AuthModule} from "@app/modules/auth/auth.module";
import graviadConfig from "./config/graviad.config";
import {PassportModule} from "@nestjs/passport";
import {ProductModule} from "@app/modules/product/product.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.development'],
            isGlobal: true,
            load: [databaseConfig, graviadConfig],
        }),
        TypeOrmModule.forRoot(databaseConfig()),
        UserModule,
        AuthModule,
        ProductModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
