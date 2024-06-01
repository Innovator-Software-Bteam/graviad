import React from "react";

export interface ILabelProps extends React.ComponentProps<'div'> {
    children: React.ReactNode;
    color?: string;
    border?: boolean;
    backgroundColor?: string;
}
