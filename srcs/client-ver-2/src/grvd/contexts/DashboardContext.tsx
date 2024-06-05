import {createContext, useContext} from "react";
import {TMerchant, TProduct, TProfile, TUser} from "grvd";

export const MerchantContext = createContext<TMerchant | undefined>(undefined);
export const UserContext = createContext<TUser | undefined>(undefined);
export const ProfileContext = createContext<TProfile | undefined>(undefined);

export function useMerchant() {
    return useContext(MerchantContext);
}
export function useUser() {
    return useContext(UserContext);
}
export function useProfile() {
    return useContext(ProfileContext);
}

export const ProductContext = createContext<TProduct | undefined>(undefined);
export const OwnerContext = createContext<TMerchant | undefined>(undefined);

export function useProduct() {
    return useContext(ProductContext);
}
export function useOwner() {
    return useContext(OwnerContext);
}

export const EditableContext = createContext<any>({
    isEditable: false,
    setEditable: () => {},
});
export function useEditable() {
    return useContext(EditableContext);
}