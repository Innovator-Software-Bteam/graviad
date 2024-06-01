import React from "react";

import {tv, TVReturnType} from "tailwind-variants";
import {twMerge} from "tailwind-merge";
import * as MT from "@material-tailwind/react";
import {IButtonProps} from "grvd/components/Button";


const baseButtonClass: TVReturnType<any, any, any, any, any, any> = tv({
    base: "font-bold normal-case",
    variants: {
        color: {
            'primary': [
                "!bg-grvd-theme-sys-dark-primary text-grvd-theme-sys-dark-on-primary",
                '!shadow-[2px_2px_35px_0px_rgba(255,255,255,0.25)]'
            ],
            'secondary': [
                "bg-grvd-theme-sys-dark-secondary text-grvd-theme-sys-dark-on-secondary",
                "hover:bg-grvd-theme-ref-secondary-500/10 font-semibold"
            ],
            'tertiary_a': ["bg-grvd-theme-sys-dark-tertiary", "hover:bg-grvd-theme-ref-tertiary-500"],
            'tertiary_b': ["bg-grvd-theme-sys-dark-tertiary", "hover:bg-grvd-theme-ref-tertiary-500"],
        },
        size: {
            'sm': "px-2 py-1 text-xs rounded-sm",
            'md': "px-3 py-1.5 text-sm rounded-md",
            'lg': "px-4 py-2.5 text-base rounded-lg",
        }

    },
    defaultVariants: {
        color: 'primary',
        size: 'md',
    }
});
export const Button = React.forwardRef((props: IButtonProps, ref) => {
    const {children, className, ...otherProps} = props;
    return (
        <MT.Button
            className={twMerge(
                baseButtonClass({
                    color: props.colorCustom,
                    size: props.sizeCustom,
                }),
                className,
            )}
            ref={ref as any}
            {...otherProps}
        >
            {children}
        </MT.Button>
    );
});