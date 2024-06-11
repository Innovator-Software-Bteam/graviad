import React from "react";

import {tv, TVReturnType} from "tailwind-variants";
import {twJoin, twMerge} from "tailwind-merge";
import * as MT from "@material-tailwind/react";
import {IButtonProps, IButtonWithLoadingProps} from "grvd/components";
import {Spinner} from "grvd/components/Spinner";
import {useSpring, animated} from "react-spring";
import {FaCircleCheck} from "react-icons/fa6";
import {SyncLoader} from "react-spinners";

const baseButtonClass: TVReturnType<any, any, any, any, any, any> = tv({
    base: "font-bold normal-case",
    variants: {
        color: {
            'primary': [
                "!bg-grvd-theme-sys-dark-primary text-grvd-theme-sys-dark-on-primary",
                '!shadow-[2px_2px_35px_0px_rgba(255,255,255,0.25)]'
            ],
            'secondary': [
                "bg-grvd-theme-sys-dark-secondary text-grvd-theme-sys-dark-on-secondary",
                "hover:bg-grvd-theme-ref-secondary-500/10 font-semibold"
            ],
            'tertiary_a': ["bg-grvd-theme-sys-dark-tertiary", "hover:bg-grvd-theme-ref-tertiary-500"],
            'tertiary_b': ["bg-grvd-theme-sys-dark-tertiary", "hover:bg-grvd-theme-ref-tertiary-500"],
        },
        size: {
            'sm': "px-2 py-1 text-xs rounded-sm",
            'md': "px-3 py-1.5 text-sm rounded-md",
            'lg': "px-4 py-2.5 text-base rounded-lg",
        }

    },
    defaultVariants: {
        color: 'primary',
        size: 'md',
    }
});
export const Button = React.forwardRef((props: IButtonProps, ref) => {
    const {children, className, ...otherProps} = props;
    return (
        <MT.Button
            className={twMerge(
                baseButtonClass({
                    color: props.colorcustom,
                    size: props.sizecustom,
                }),
                className,
            )}
            ref={ref as any}
            {...otherProps}
        >
            {children}
        </MT.Button>
    );
});

export const ButtonWithLoading = React.forwardRef((props: IButtonWithLoadingProps, ref) => {
    const {isdone, isloading, iserror, children, ...otherProps} = props;
    const {
        labelDefault,
        labelLoading,
        labelDone,
        labelError = 'Error',
    } = props.label;
    const doneRef = React.useRef(false);
    const doneAnimation = useSpring({
        top: isdone ? 0 : -30,
        config: {tension: 220, friction: 20},
    })
    return (
        <Button
            ref={ref as any}
            {...otherProps}
            disabled={isloading}
            className={twJoin(
                'flex flex-row gap-2 items-center justify-center',
                'transition-all duration-300 ease-in-out',
                props.className
            )}
        >
            {isloading && labelLoading}
            {isdone && (
                <animated.div
                    ref={doneRef as any}
                    style={{
                        translateY: doneAnimation.top.to((top) => `${top}px`),
                        transition: 'top 0.3s ease-in-out',
                    }}
                    className={'flex flex-row gap-2 items-center w-fit'}
                >
                    {isdone && labelDone}
                    {isdone && <FaCircleCheck size={20}/>}
                </animated.div>
            )}
            {!isloading && !isdone && children}
            {iserror && labelError}
            {isloading && <SyncLoader size={5}/>}
        </Button>
    );
});