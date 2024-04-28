import './buttons.scss' ;
import {tv} from "tailwind-variants";
import {PropTypes,} from "prop-types";
import {twMerge} from "tailwind-merge";
import {Button as MTButton} from "@material-tailwind/react";
import classNames from "classnames";



const baseButton = tv({
    base: 'font-semibold w-fit',
    variants: {
        color: {
            primary: 'text-grvd-theme-sys-dark-on-primary bg-grvd-theme-sys-dark-primary',
            secondary: 'text-grvd-theme-sys-dark-on-secondary-variant bg-grvd-theme-sys-dark-secondary',
            tertiary: 'text-grvd-theme-sys-dark-on-tertiary bg-grvd-theme-sys-dark-tertiary',
            auxiliary: 'text-grvd-theme-sys-dark-on-secondary bg-grvd-theme-ref-secondary-secondary-800',
        },
        size: {
            sm: 'text-xs px-2 py-1 rounded-sm',
            md: 'text-sm px-3 py-1.5 rounded-md',
            lg: 'text-base px-5 py-2.5 rounded-lg',
        },

        variant: {
            contained: '',
            outlined: '',
            text: 'bg-transparent border-transparent',
        },
        state: {
            inactive: '',
            active: '',
        },
    },
    compoundVariants: [{
        size: 'sm',
        variant: 'contained',
        color: 'primary',
        className: '!shadow-[2px_2px_35px_0px_rgba(255,255,255,0.25)]',
    },{
        size: 'md',
        variant: 'contained',
        color: 'primary',
        className: '!shadow-[2px_2px_35px_0px_rgba(255,255,255,0.25)]',
    }
    ,{
        size: 'lg',
        variant: 'contained',
        color: 'primary',
        className: '!shadow-[2px_2px_35px_0px_rgba(255,255,255,0.25)]',
    }],
    defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'contained',
        state: 'active',
    }
});
Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'auxiliary']),
    variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
    disabled: PropTypes.bool,

};
export function Button({
                           children,
                           className,
                           ...props
                       }) {
    return (
        <MTButton
            className={
                classNames(baseButton({
                    color: props.color,
                    size: props.size,
                    variant: props.variant,
                }), className)
            }
            variant={props.variant}
            disabled={props.disabled}
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
                                   ...props
                               }) {
    return (
        <MTButton
            className={
                classNames(buttonWithIcon({
                    color: props.color,
                    size: props.size,
                    variant: props.variant,
                }), className)
            }
            variant={props.variant}
            disabled={props.disabled}
            style={{
                textTransform: 'none',
            }}
        >
            {children}
        </MTButton>
    );
}