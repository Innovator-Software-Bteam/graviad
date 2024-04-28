import classNames from "classnames";

export function Main({
                         children,
                         className,
                         ...props
                     }) {
    return (
        <main
            className={
                classNames(
                    'h-full',
                    'w-full',
                    className)
            }
            {...props}
        >
            {children}
        </main>
    );
}