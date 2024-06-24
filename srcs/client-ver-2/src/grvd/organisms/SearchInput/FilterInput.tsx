import {Input} from "grvd/components/Input";
import {CiSearch} from "react-icons/ci";
import React from "react";
import {useFilterInput} from "grvd/organisms/SearchInput/FilterInputContext";

export function FilterInput() {
    return (
        <Input
            placeholder={'Search anything ...'}
            labelProps={{
                className: 'hidden'
            }}
            icon={<CiSearch size={24} color={'white'}/>}
        />
    );
}