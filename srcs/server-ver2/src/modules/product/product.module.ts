import {ProductFeatureService, ProductMediaFromSplineService, ProductService} from './product.service';
import { ProductController } from './product.controller';
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product, ProductFeature} from "@app/modules/product/entities/product.entity";
import {UserModule} from "@app/modules/user";
import {ProductMediaFromSpline, ProductThumbnail2D} from "@app/modules/product/entities/productMedia.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ProductFeature, ProductThumbnail2D, ProductMediaFromSpline]),
        UserModule
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductFeatureService, ProductMediaFromSplineService],
})

export class ProductModule {
}