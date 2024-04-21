import {tv} from "tailwind-variants";
import classNames from "classnames";

const baseLabel = tv({
    base: [
        'font-medium',
        'rounded-full',
        'px-5',
        'border',
    ],
    variants: {
        size: {
            sm: 'text-xs py-1',
            base: 'text-sm py-2',
            lg: 'text-base py-3',
        },
        variant: {
            contained: '',
            outlined: '!bg-transparent',
            text: '!bg-transparent !border-transparent'
        },
        color: {
            primary: 'bg-graviad-theme/state-layers/primary/opacity-0.1/10 text-graviad-theme/sys/dark/primary border-graviad-theme/sys/dark/primary',
            secondary: 'bg-graviad-theme/state-layers/secondary/opacity-0.1 text-graviad-theme/sys/dark/secondary border-graviad-theme/sys/dark/secondary',
            tertiary: 'bg-graviad-theme/state-layers/tertiary/opacity-0.1 text-graviad-theme/sys/dark/tertiary border-graviad-theme/sys/dark/tertiary',
        }
    },
    defaultVariants: {
        size: 'lg',
        variant: 'contained',
        color: 'primary',
    }
})

export function Label({
                          children, className,
                          size,
                          variant,
                          color,
                          ...props
                      }) {
    className = classNames(baseLabel({
        size: size,
        variant: variant,
        color: color,
    }), className);
    return (
        <label className={className} {...props}>
            {children}
        </label>
    );
}