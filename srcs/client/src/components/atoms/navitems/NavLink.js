import {tv} from "tailwind-variants";
import classNames from "classnames";

const baseNavLink = tv({
    base: [
        'font-medium',
        'hover:text-graviad-theme/sys/dark/secondary',
        'transition-colors duration-500 ease-in-out',
        'px-2 py-1',
    ],
    variants: {
        size: {
            sm: 'text-xs',
            base: 'text-sm',
            lg: 'text-base',
        },
        state: {
            enabled: '',
            disabled: 'cursor-not-allowed opacity-50',
            inactive: 'text-graviad-theme/ref/secondary/secondary-800',
            active: 'text-graviad-theme/sys/dark/secondary',
        }
    },
    defaultVariants: {
        size: 'base',
        state: 'inactive',
    }
})

export function NavLink({
                            children, className,
                            size,
                            state,
                            ...props
                        }) {
    className = classNames(baseNavLink({
        size: size,
        state: state,
    }), className);
    return (
        <a className={className} {...props}>
            {children}
        </a>
    );
}