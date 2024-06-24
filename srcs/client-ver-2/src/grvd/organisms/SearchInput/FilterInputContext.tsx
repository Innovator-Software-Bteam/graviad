import React, {createContext} from "react";

export interface ISearchInputContext {
    handleFilter?: (object: any) => void;
    filters?: string[];
    setFilters?: (filters: string[]) => void;
}

export const FilterInputContext = createContext<ISearchInputContext>({});

export function useFilterInput() {
    return React.useContext(FilterInputContext);
}
