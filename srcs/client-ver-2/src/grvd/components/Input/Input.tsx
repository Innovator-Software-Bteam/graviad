import React from "react";
import {twJoin, twMerge} from "tailwind-merge";
import * as MT from "@material-tailwind/react";
import {Typography} from "@material-tailwind/react";
import {IInputProps, ITextAreaProps} from "grvd/components/Input";
import classNames from "classnames";
export const Input = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
    return (
        <MT.Input
            {...props}
            ref={ref as any}
            crossOrigin={undefined}
            className={twMerge([
                'rounded-lg',
                '!px-4 !py-3 w-full',
                'text-grvd-theme-sys-dark-on-surface',
                '!bg-grvd-theme-sys-dark-surface-container !border-transparent !border',
                '!outline-none',
                '!font-light !text-base',
                'focus:!border-grvd-theme-sys-dark-primary',
                'placeholder:text-grvd-theme-sys-dark-primary placeholder:opacity-100',
                'transition-colors duration-200 ease-in-out',
                'hover:!border-grvd-theme-sys-dark-primary hover:!bg-grvd-theme-sys-dark-surface-container-higher',
                'focus:!border-grvd-theme-sys-dark-primary focus:!bg-grvd-theme-sys-dark-surface-container-higher',
                '!placeholder-grvd-theme-sys-dark-on-surface/50',
                props.className
            ])}
            labelProps={{
                className: 'hidden'
            }}
            containerProps={{
                className: 'flex flex-row items-center h-fit' + (props.containerProps?.className ? ' ' + props.containerProps.className : '')
            }}
        />
    );
});
export const InputWithTitle = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => (
    <div className={twMerge([
        'flex flex-col gap-2 w-full',
        props.containerProps?.className
    ])}>
        <Typography className={twJoin(
            'text-grvd-theme-sys-dark-primary font-semibold text-base'
        )}>
            {props.title}
        </Typography>
        <Input
            {...props}
            labelProps={{
                className: 'hidden'
            }}
            ref={ref as any}
        />
    </div>
));



export const Textarea = React.forwardRef<HTMLTextAreaElement, ITextAreaProps>((props, ref) => (
    <MT.Textarea
        {...props}
        className={twMerge([
            'rounded-lg',
            '!px-4 !py-3 w-full',
            'text-grvd-theme-sys-dark-on-surface',
            '!bg-grvd-theme-sys-dark-surface-container !border-transparent !border',
            '!outline-none',
            '!font-light !text-base',
            'focus:!border-grvd-theme-sys-dark-primary',
            'placeholder:text-grvd-theme-sys-dark-primary placeholder:opacity-100',
            'transition-colors duration-200 ease-in-out',
            'hover:!border-grvd-theme-sys-dark-primary hover:!bg-grvd-theme-sys-dark-surface-container-higher',
            'focus:!border-grvd-theme-sys-dark-primary focus:!bg-grvd-theme-sys-dark-surface-container-higher',
            '!placeholder-grvd-theme-sys-dark-on-surface/50',
            props.className
        ])}
        labelProps={{
            className: 'hidden'
        }}
        containerProps={{
            className: 'flex flex-row items-center' + (props.containerProps?.className ? ' ' + props.containerProps.className : '')
        }}
        ref={ref as any}
    />
));
export const TextareaWithTitle = React.forwardRef<HTMLTextAreaElement, ITextAreaProps>((props, ref) => (
    <div className={twMerge([
        'flex flex-col gap-2 w-auto',
        props.containerProps?.className
    ])}>
        <Typography className={twJoin(
            'text-grvd-theme-sys-dark-primary font-semibold text-base'
        )}>
            {props.title}
        </Typography>
        <Textarea
            {...props}
            labelProps={{
                className: 'hidden'
            }}
            ref={ref as any}
        />
    </div>
));