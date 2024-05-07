import React from "react";
import {Input as MTInput} from "@material-tailwind/react";
import {IInput} from "./index";
import {twMerge} from "tailwind-merge";

const baseInputClass = twMerge([
    'rounded-md px-4 py-3',
    'test-md',
]);
export const Input = React.forwardRef(({children, ...props}: IInput, ref: any) => (
    <MTInput
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
        className={twMerge([
            'rounded-md px-4 py-3',
            'text-base',
        ])}
        {...props}
        ref={ref}
    >
        {children}
    </MTInput>
));