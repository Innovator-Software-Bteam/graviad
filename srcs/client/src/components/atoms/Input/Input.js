import {tv} from "tailwind-variants";
import {PropTypes} from "prop-types";
import classNames from 'classnames';
import {forwardRef} from 'react';
import {Input as MTInput} from "@material-tailwind/react";

const baseInput = tv({
    base: [
        'font-light',
        'bg-grvd-theme-sys-dark-surface-container text-grvd-theme-sys-dark-on-surface border-grvd-theme-sys-dark-surface-container border',
        'focus:outline-none focus:ring-1 focus:ring-grvd-theme/sys/dark/primary focus:border-grvd-theme/sys/dark/primary',
    ],
    variants: {
        size: {
            sm: 'text-sm px-3 py-1 rounded-sm',
            base: 'text-md px-4 py-1 rounded-md',
            lg: 'text-lg px-5 py-2 rounded-lg',
        },
    },
    defaultVariants: {
        size: 'lg',
    }
});

export const Input = forwardRef(({className, size, ...props}, ref) => {
    return (
        <MTInput
            className={classNames(
                'rounded-md',
                'text-grvd-theme-sys-dark-on-surface',
                '!bg-grvd-theme-sys-dark-surface-container',
                '!border-grvd-theme-ref-neutral-neutral-400 !border',
                'outline-none',

                'focus:!border-grvd-theme-sys-dark-primary',
                'placeholder:text-grvd-theme-sys-dark-primary placeholder:opacity-100',
                'transition-colors duration-200 ease-in-out',
                'hover:!border-grvd-theme-sys-dark-primary',
            )}
            {...props}
        />
    );
});
Input.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),

    //Base props for Input
    type: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func,
    onInput: PropTypes.func,
    onInvalid: PropTypes.func,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
    onPaste: PropTypes.func,
    onCopy: PropTypes.func,
    onCut: PropTypes.func,
    onCompositionStart: PropTypes.func,
    onCompositionEnd: PropTypes.func,
    onContextMenu: PropTypes.func,
};
