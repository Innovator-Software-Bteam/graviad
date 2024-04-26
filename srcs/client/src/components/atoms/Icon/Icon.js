import {tv} from "tailwind-variants";

const baseIcon = tv({
    base: [
        'w-6',
        'h-6',
    ],
    variants: {
        size: {
            sm: 'w-4 h-4',
            base: 'w-5 h-5',
            lg: 'w-6 h-6',
        }
    },
    defaultVariants: {
        size: 'base',
    }
})

export function IconSVG({
                         className,
                         size,
                         children,
                         ...props

                     }) {
    const sizes = {
        sm: 16,
        base: 20,
        lg: 24,
    }
    return(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={baseIcon({
                size: size,
            })}
            fill="none"
            viewBox={`0 0 ${sizes[size]} ${sizes[size]}`}
            width={sizes[size]}
            height={sizes[size]}
            stroke="currentColor"
            {...props}
        >
            {children}
        </svg>
    )
}
export function IconBrand({
                              className,
                              size,
                              ...props
                          }) {
    const sizes = {
        sm: 16,
        base: 24,
        lg: 32,
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={baseIcon({
                size: size,
            })}
            fill="none"
            viewBox={`0 0 ${sizes[size]} ${sizes[size]}`}
            width={sizes[size]}
            height={sizes[size]}
            stroke="currentColor"
            {...props}
        >
            <rect width="100%" height="100%" rx="5" fill="#FF531A"/>
        </svg>
    );
}