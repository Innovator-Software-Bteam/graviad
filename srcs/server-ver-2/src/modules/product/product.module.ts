import {
    ProductFeatureService,
    ProductMediaFromSplineService,
    ProductService,
    ProductThumbnailService
} from './product.service';
import { ProductController } from './product.controller';
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product, ProductFeature} from "@app/modules/product/entities/product.entity";
import {ProductMediaFromSpline, ProductThumbnail2D} from "@app/modules/product/entities/productMedia.entity";
import {MerchantModule} from "@app/modules/merchant";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, ProductFeature, ProductThumbnail2D, ProductMediaFromSpline]),
        MerchantModule
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductFeatureService, ProductMediaFromSplineService, ProductThumbnailService],
    exports: [ProductService, ProductFeatureService, ProductMediaFromSplineService, ProductThumbnailService]
})

export class ProductModule {
}