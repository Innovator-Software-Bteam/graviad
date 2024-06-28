import {IDatabaseCRUD, IQuery} from "@app/interfaces";
import {Product} from "@app/modules/product/entities";
import {CreateProductDTO, UpdateProductDTO} from "@app/modules/product/dto";

export interface IProductQuery extends IQuery {

}

export interface IProductInteraction {
    likesProduct?(productId: number, merchantId: string): Promise<boolean>;

}

export interface IProductCRUD extends IDatabaseCRUD<Product, CreateProductDTO, UpdateProductDTO> {

}