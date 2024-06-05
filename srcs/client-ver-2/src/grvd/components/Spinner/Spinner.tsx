import {SyncLoader} from "react-spinners";
import React from "react";

export interface ISpinnerProps extends React.ComponentProps<'div'> {
    color?: string;
    size?: number;
}
export function Spinner({color}: ISpinnerProps) {
    return (
        <SyncLoader size={5} color={color}/>
    );
}