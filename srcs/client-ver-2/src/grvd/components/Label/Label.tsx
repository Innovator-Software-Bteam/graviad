import {twJoin} from "tailwind-merge";
import React from "react";
import {ILabelProps} from "grvd/components/Label";


export function Label({children, className, color, border, backgroundColor, ...props}: ILabelProps) {
    return (
        <div className={twJoin(
            'rounded-full w-fit px-4 py-2',
            `bg-grvd-theme-sys-dark-tertiary/10 text-grvd-theme-sys-dark-tertiary`,
            'border-grvd-theme-sys-dark-tertiary border',
            border ? '' : 'border-0',
            className
        )}
             style={{
                 backgroundColor: backgroundColor,
                 borderColor: color,
                 color: color,
             }}
        >
            {children}
        </div>
    );
}