import { User } from "@app/modules/user";
import { ProductMediaFromSpline, ProductThumbnail2D } from "@app/modules/product/entities/productMedia.entity";
import { Merchant } from "@app/modules/merchant";
export declare class Product {
    id: number;
    price: string;
    name: string;
    description: string;
    version: string;
    link: string;
    brief: string;
    dateRelease: Date;
    highlightLabel: string;
    numberOfLikes: number;
    thumbnail2D: ProductThumbnail2D;
    thumbnail2DId: number;
    merchantId: string;
    merchant: Merchant;
    features: ProductFeature[];
    featureIds: number[];
    mediaFromSpline: ProductMediaFromSpline;
    likedBy: User[];
    likedByIds: string[];
}
export declare class ProductFeature {
    id: number;
    name: string;
    description: string;
    product: Product;
    productId: number;
}
