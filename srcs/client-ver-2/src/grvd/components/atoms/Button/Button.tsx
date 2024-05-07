import {Button as MTButton} from "@material-tailwind/react";
import React from "react";
import {IButtonProps} from "./index";
import {tv} from "tailwind-variants";
import {ButtonColor, ButtonSize} from "./index";


const baseButtonClass = tv({
    base: "font-semeibold text-white",
    variants: {
        color: {
            [ButtonColor.PRIMARY]: ["bg-grvd-theme-sys-dark-primary", "hover:bg-grvd-theme-ref-primary-500"],
            [ButtonColor.SECONDARY]: ["bg-grvd-theme-sys-dark-secondary", "hover:bg-grvd-theme-ref-secondary-500"],
            [ButtonColor.TERTIARY_A]: ["bg-grvd-theme-sys-dark-tertiary", "hover:bg-grvd-theme-ref-tertiary-500"],
            [ButtonColor.TERTIARY_B]: ["bg-grvd-theme-sys-dark-tertiary", "hover:bg-grvd-theme-ref-tertiary-500"],
        },
        size: {
            [ButtonSize.SMALL]: "px-2 py-1 text-xs rounded-sm",
            [ButtonSize.MEDIUM]: "px-3 py-1.5 text-sm rounded-md",
            [ButtonSize.LARGE]: "px-5 py-2.5 text-base rounded-lg",
        }

    }
});

export function Button({children, ...props}: IButtonProps) {
    return (
        <MTButton
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className={baseButtonClass()}
            {...props}
        >
            {children}
        </MTButton>
    );
}