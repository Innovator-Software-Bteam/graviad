import './buttons.scss' ;
import {tv} from "tailwind-variants";
import {PropTypes} from "prop-types";
import {Button as MTButton} from "@material-tailwind/react";
import classNames from "classnames";

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'auxiliary']),
    disabled: PropTypes.bool,
    is3DSimulated: PropTypes.bool,
};

const baseButton = tv({
    base: 'font-semibold',
    variants: {
        color: {
            primary: 'text-graviad-theme/sys/dark/on-primary-variant bg-graviad-theme/sys/dark/primary',
            secondary: 'text-graviad-theme/sys/dark/on-secondary-variant bg-graviad-theme/ref/secondary/secondary-950',
            tertiary: 'text-graviad-theme/sys/dark/on-tertiary bg-graviad-theme/sys/dark/tertiary',
            auxiliary: 'text-graviad-theme/sys/dark/on-secondary bg-graviad-theme/ref/secondary/secondary-800',
        },
        size: {
            sm: 'text-xs px-2 py-1 rounded-3xl',
            base: 'text-sm px-3 py-2 rounded-4xl',
            lg: 'text-base px-4 py-3 rounded-5xl',
        },
        disabled: {
            true: 'cursor-not-allowed opacity-50',
            false: '',
        },
        is3DSimulated: {
            true: '!shadow-[2px_2px_4px_0px_rgba(12,12,12,0.25),0px_2px_1px_0px_rgba(52,52,51,0.25)_inset,0px_-2px_1px_0px_rgba(26,26,26,0.25)_inset]',
            false: '!shadow-none',
        },
        variant: {
            contained: '',
            outlined: '',
            text: 'bg-transparent border-transparent',
        },
        state: {
            disabled: 'cursor-not-allowed opacity-50',
            inactive: 'text-graviad-theme/ref/secondary/secondary-800',
            active: '',
        },
    },
    compoundVariants: [
        {
            variant: 'outlined',
            is3DSimulated: true,
            className: '!shadow-none'
        },
        {
            is3DSimulated: true,
            color: ['primary', 'auxiliary'],
            className: '!shadow-[2px_2px_4px_0px_rgba(12,12,12,0.25),0px_2px_1px_0px_rgba(204,204,204,0.25)_inset,0px_-2px_1px_0px_rgba(26,26,26,0.25)_inset]'
        },
    ],
    defaultVariants: {
        size: 'base',
        color: 'primary',
        is3DSimulated: true,
        variant: 'contained',
        disabled: false,
        state: 'active',
    }
});

export function Button({
                           children,
                           className,
                           color,
                           type,
                           size,
                           variant,
                           disabled,
                           is3DSimulated,
                           ...props
                       }) {

    return (
        <MTButton
            className={
                classNames(baseButton({
                    color: color,
                    size: size,
                    disabled: disabled,
                    is3DSimulated: is3DSimulated,
                    variant: variant,
                }), className)
            }
            variant={variant}
            disabled={disabled}
            style={{
                textTransform: 'none',
            }}
            {...props}
        >
            {children}
        </MTButton>
    );
}

const buttonWithIcon = tv({
    extend: baseButton,
    base: ['flex items-center gap-2',],
});

export function ButtonWithIcon({
                                   children,
                                   className,
                                   color,
                                   size,
                                   variant,
                                   disabled,
                                   is3DSimulated,
                                   ...props
                               }) {
    return (
        <MTButton
            className={
                classNames(buttonWithIcon({
                    color: color,
                    size: size,
                    disabled: disabled,
                    is3DSimulated: is3DSimulated,
                    variant: variant,
                }), className)
            }
            variant={variant}
            disabled={disabled}
            style={{
                textTransform: 'none',
            }}
        >
            {children}
        </MTButton>
    );
}