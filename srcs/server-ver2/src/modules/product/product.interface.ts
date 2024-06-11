import {IQuery} from "@app/interfaces";

export interface IProductQuery extends IQuery {

}

export interface IProductInteraction {
    likesProduct?(productId: number, merchantId: string): Promise<boolean>;

}