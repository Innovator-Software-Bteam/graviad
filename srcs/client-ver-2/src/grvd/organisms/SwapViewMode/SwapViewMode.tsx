import React, {ComponentProps, useEffect, useState} from "react";
import {Button} from "grvd/components/Button";
import {twJoin} from "tailwind-merge";
import {MdModeEditOutline} from "react-icons/md";
import {TiEye} from "react-icons/ti";
import {useLocation, useNavigate} from "react-router-dom";
import {useProduct} from "grvd/contexts";

export type TViewMode = 'preview' | 'edit';
export type TViewModeContext = {
    viewMode: TViewMode;
    setViewMode: (mode: TViewMode) => void;
    condition?: {
        preview: boolean;
        edit: boolean;
    };
}
export let ViewModeContext = React.createContext<TViewModeContext>({
    viewMode: 'preview',
    setViewMode: (mode) => {
    },
    condition: {
        preview: true,
        edit: true,
    }
});

export function useViewMode() {
    return React.useContext(ViewModeContext);
}

export interface ISwapViewModeProps extends ComponentProps<'div'> {
    condition?: {
        preview?: boolean;
        edit?: boolean;
    };

}

export function SwapViewMode({}: ISwapViewModeProps) {
    const {viewMode, setViewMode, condition} = useViewMode();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSwapState = () => {
        if (location.state?.viewMode === 'preview') {
            const state = {
                viewMode: 'edit'
            };
            window.history.pushState(state, '', location.pathname);
            navigate(location.pathname, {
                state
            });

        } else if (location.state?.viewMode === 'edit') {
            const state = {
                viewMode: 'preview'
            }
            window.history.pushState(state, '', location.pathname)
            navigate(location.pathname, {
                state
            });
        } else {
            const state = {
                viewMode: 'preview'
            }
            window.history.pushState(state, '', location.pathname)
            navigate(location.pathname, {
                state
            });
        }

    };
    return (
        <>
            {(location.state?.viewMode === 'preview' && condition?.preview) &&
                <Button
                    colorcustom={'tertiary'}
                    className={twJoin(
                        'shadow-none border-none',
                        'bg-grvd-theme-sys-dark-quaternary',
                        'rounded-full p-1 w-fit h-fit',
                        '[box-shadow:0px_0px_0px_5px_rgba(246,_110,_249,_0.25)]',
                        'z-50'
                    )}
                    onClick={handleSwapState}
                >
                    <MdModeEditOutline size={32} color={'#DF9BFF'}/>
                </Button>
            }
            {(location.state?.viewMode === 'edit' && condition?.edit) &&
                <Button
                    colorcustom={'tertiary'}
                    className={twJoin(
                        'shadow-none border-none',
                        'bg-grvd-theme-sys-dark-tertiary',
                        'rounded-full p-1 w-fit h-fit',
                        '[box-shadow:0px_0px_0px_5px_rgba(13,_80,_253,_0.25)]',
                        'z-50'
                    )}
                    onClick={handleSwapState}
                >
                    <TiEye size={32} color={'#9BDBFF'}/>
                </Button>
            }
            {(!location.state?.viewMode && condition?.preview) &&
                <Button
                    colorcustom={'tertiary'}
                    className={twJoin(
                        'shadow-none border-none',
                        'bg-grvd-theme-sys-dark-quaternary',
                        'rounded-full p-1 w-fit h-fit',
                        '[box-shadow:0px_0px_0px_5px_rgba(246,_110,_249,_0.25)]',
                        'z-50'
                    )}
                    onClick={handleSwapState}
                >
                    <MdModeEditOutline size={32} color={'#DF9BFF'}/>
                </Button>
            }
        </>
    );
}