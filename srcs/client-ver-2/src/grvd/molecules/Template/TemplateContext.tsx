import {createContext, useContext} from "react";
import {TTemplate} from "grvd/molecules/Template/types";

export const TemplateContext = createContext<TTemplate | undefined>(undefined);
export function useTemplate() {
    return useContext(TemplateContext);
}