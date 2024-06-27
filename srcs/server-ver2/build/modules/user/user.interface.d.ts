import { IQuery } from "@app/interfaces";
export declare enum ErrorUserMessage {
    USER_NOT_FOUND = "User not found",
    USER_EXISTED = "User is existed",
    USER_NOT_CREATED = "User not created",
    USER_NOT_UPDATED = "User not updated",
    USER_NOT_DELETED = "User not deleted",
    USER_NOT_DELETED_ALL = "User not deleted all",
    USER_NOT_FOUND_OR_CREATED = "User not found or created",
    USER_NOT_UPDATED_PARTIAL = "User not updated partial"
}
export declare enum ErrorMerchantMessage {
    MERCHANT_NOT_FOUND = "Merchant not found",
    MERCHANT_EXISTED = "Merchant is existed",
    MERCHANT_NOT_CREATED = "Merchant not created",
    MERCHANT_NOT_UPDATED = "Merchant not updated",
    MERCHANT_NOT_DELETED = "Merchant not deleted",
    MERCHANT_NOT_DELETED_ALL = "Merchant not deleted all",
    MERCHANT_NOT_FOUND_OR_CREATED = "Merchant not found or created",
    MERCHANT_NOT_UPDATED_PARTIAL = "Merchant not updated partial"
}
export interface IUserQuery extends IQuery {
}
export interface IUserAction {
    likeProduct?(userId: string, productId: number): any;
    unlikeProduct?(userId: string, productId: number): any;
    followMerchant?(userId: string, merchantId: string): any;
    unfollowMerchant?(userId: string, merchantId: string): any;
}
