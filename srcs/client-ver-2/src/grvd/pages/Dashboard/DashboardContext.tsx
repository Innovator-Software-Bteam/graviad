import {createContext, useContext} from "react";
import {TMerchant, TProfile, TUser} from "grvd";

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