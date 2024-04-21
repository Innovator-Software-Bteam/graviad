import {tv} from "tailwind-variants";
import {PropTypes} from "prop-types";
import {Input as MTInput} from "@material-tailwind/react";
import classNames from 'classnames';

const baseInput = tv({
    base: [
        'bg-graviad-theme/sys/dark/surface-container text-graviad-theme/sys/dark/on-surface-container border-graviad-theme/sys/dark/surface-container border px-4 py-3 rounded-5xl',
        'focus:outline-none focus:ring-2 focus:ring-graviad-theme/sys/dark/primary focus:border-graviad-theme/sys/dark/primary',
    ],
    variants: {
        size: {
            small: 'text-sm px-2 py-1 rounded-3xl',
            medium: 'text-base px-3 py-2 rounded-4xl',
            large: 'text-lg px-4 py-3 rounded-5xl',
        },
    },
});

Input.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),

    //Base props for input
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

export function Input({
                          children, className,
                          size = 'lg',
                          ...props
                      }) {
    className = classNames(baseInput({
        size: size,
    }), className);
    return (
        <input
            type="text"
            className={className}
            {...props}
        />
    );
}