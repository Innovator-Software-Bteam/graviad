import {ProductFeatureService, ProductService} from './product.service';
import { ProductController } from './product.controller';
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product, ProductFeature} from "@app/modules/product/entities/product.entity";
import {UserModule} from "@app/modules/user";
import {ProductThumbnail2D} from "@app/modules/product/entities/productImages.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ProductFeature, ProductThumbnail2D]),
        UserModule
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductFeatureService],
})

export class ProductModule {
}