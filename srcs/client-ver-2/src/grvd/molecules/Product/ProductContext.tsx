import {createContext, useContext} from "react";
import {TMerchant, TProduct} from "grvd";

export const ProductContext = createContext<TProduct | undefined>(undefined);
export const OwnerContext = createContext<TMerchant | undefined>(undefined);

export function useProduct() {
    return useContext(ProductContext);
}
export function useOwner() {
    return useContext(OwnerContext);
}