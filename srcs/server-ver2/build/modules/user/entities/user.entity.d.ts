import { Merchant } from "@app/modules/merchant";
import { TProfile } from "../index";
import { Product } from "@app/modules/product";
export declare class Profile {
    id: string;
    provider: string;
    data: TProfile;
}
export declare class User {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    profile: Profile;
    profileId: string;
    merchant: Merchant;
    merchantId: string;
    likedProducts: Product[];
    likedProductIds: number[];
    followingMerchants: Merchant[];
    followingMerchantIds: string[];
}
