import {SelectProps, Select as MTSelect, SelectOptionProps, Option as MTSelectOption} from '@material-tailwind/react'
import React from "react";
import {twJoin} from "tailwind-merge";
export interface ISelectProps extends SelectProps {

}

export const Select = React.forwardRef((props: ISelectProps, ref: React.Ref<HTMLSelectElement>) => {
    const {children,className, ...otherProps} = props;
    return (
        <MTSelect
            ref={ref as any}
            className={twJoin(
                'w-full px-4 py-3',
                'bg-grvd-theme-sys-dark-surface-container-higher text-grvd-theme-sys-dark-primary',
                'border-none shadow-none',
                'rounded-lg',
                className,
            )}
            {...otherProps}
            labelProps={{
                className: 'hidden' + (props.labelProps?.className ? ' ' + props.labelProps.className : '')
            }}
            containerProps={{
                className: 'flex items-center w-[10em] shadow-none' + (props.containerProps?.className ? ' ' + props.containerProps.className : '')
            }}
            menuProps={{
                className: 'bg-grvd-theme-sys-dark-surface-container-higher/50 backdrop-blur-lg rounded-lg border-none shadow-none' + (props.menuProps?.className ? ' ' + props.menuProps.className : '')
            }}
        >
            {children}
        </MTSelect>
    );
});

export interface ISelectOptionProps extends SelectOptionProps {

}

export const SelectOption = React.forwardRef((props: ISelectOptionProps, ref: React.Ref<HTMLLIElement>) => {
    const {children, className, ...otherProps} = props;
    return (
        <MTSelectOption
            ref={ref as any}
            className={twJoin(
                'rounded-md',
                'text-grvd-theme-sys-dark-on-primary-variant',
                'bg-transparent',
                'hover:bg-grvd-theme-sys-dark-surface-container-higher/50',
                'hover:text-grvd-theme-sys-dark-primary',
                'focus:bg-grvd-theme-sys-dark-surface-container-higher/50',
                'focus:text-grvd-theme-sys-dark-primary',
                'active:bg-grvd-theme-sys-dark-surface-container-higher/50',
                'active:text-grvd-theme-sys-dark-primary',

                'transition-colors duration-200 ease-in-out',
                className,
            )}
            {...otherProps}
        >
            {children}
        </MTSelectOption>
    );
});