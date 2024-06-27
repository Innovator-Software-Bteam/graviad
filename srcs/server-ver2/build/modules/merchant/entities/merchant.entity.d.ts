import { TSocialLinkProvider } from "../merchant.interface";
import { Avatar } from "./property.entity";
import { Product } from "@app/modules/product/entities";
import { Template } from "@app/modules/template/entities";
import { User } from "@app/modules/user";
export declare class Merchant {
    id: string;
    phone: string;
    address: string;
    name: string;
    email: string;
    description: string;
    slogan: string;
    numberOfLikes: number;
    numberOfProducts: number;
    socialLinks: SocialLink[];
    user: User;
    userId: string;
    avatar: Avatar;
    products: Product[];
    likedProducts: Product[];
    likedProductIds: number[];
    templateIds: number[];
    followers: User[];
    followerIds: string[];
    createdAt: Date;
    updatedAt: Date;
    usingTemplateProfileCardId: number;
    templates: Template[];
}
export declare class SocialLink {
    id: number;
    provider: TSocialLinkProvider;
    data: string;
    merchant: Merchant;
    merchantId: string;
}
