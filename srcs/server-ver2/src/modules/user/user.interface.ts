import {IQuery} from "@app/interfaces";

export type TSocialLinkProvider = 'Facebook' | 'Twitter' | 'Instagram' | 'Website';

export enum ErrorUserMessage {
    USER_NOT_FOUND = 'User not found',
    USER_EXISTED = 'User is existed',
    USER_NOT_CREATED = 'User not created',
    USER_NOT_UPDATED = 'User not updated',
    USER_NOT_DELETED = 'User not deleted',
    USER_NOT_DELETED_ALL = 'User not deleted all',
    USER_NOT_FOUND_OR_CREATED = 'User not found or created',
    USER_NOT_UPDATED_PARTIAL = 'User not updated partial',
}
export enum ErrorMerchantMessage {
    MERCHANT_NOT_FOUND = 'Merchant not found',
    MERCHANT_EXISTED = 'Merchant is existed',
    MERCHANT_NOT_CREATED = 'Merchant not created',
    MERCHANT_NOT_UPDATED = 'Merchant not updated',
    MERCHANT_NOT_DELETED = 'Merchant not deleted',
    MERCHANT_NOT_DELETED_ALL = 'Merchant not deleted all',
    MERCHANT_NOT_FOUND_OR_CREATED = 'Merchant not found or created',
    MERCHANT_NOT_UPDATED_PARTIAL = 'Merchant not updated partial',
}

export interface IUserQuery extends IQuery {

}
// array text alt_texts
type TRelationsUser = 'profile' | 'merchant' | 'avatar2D';
export interface IMerchantQuery extends IQuery {
    relations?: TRelationsUser[];
}

export interface IAvatarQuery extends IQuery {

}