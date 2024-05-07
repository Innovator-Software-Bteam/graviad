import classNames from "classnames";
import {Label} from "../../atoms/Label/Label";
import {ButtonWithIcon} from "../../atoms/Button";
import {IconSVG} from "../../atoms/Icon";
import {Home} from "../../pages/Homepage/Home";

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