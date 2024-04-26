import classNames from "classnames";

export function Menu({
    children,
    className,
    ...props
                     }) {
    return (
        <div className={classNames(
            'flex flex-col',
            'rounded-lg',
            'px-3 py-2',

            'bg-grvd-theme-sys-dark-surface-container',
            'blur-[25px]'
        )}>
            {children}
        </div>
    );
}