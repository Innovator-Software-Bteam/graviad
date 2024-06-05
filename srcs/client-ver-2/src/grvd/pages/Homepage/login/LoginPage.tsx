import React from 'react';
import {twJoin, twMerge} from "tailwind-merge";
import {Button} from "grvd/components/index";
import config from "../../../../config";
import {useNavigate} from "react-router-dom";
import {Typography} from "@material-tailwind/react";
import {FaSquareFacebook} from "react-icons/fa6";
import {FaGoogle} from "react-icons/fa";

enum ListContentOfLoginPage {
    TITLE = 'Welcome to Graviad',
    DESCRIPTION = 'Log in to become a merchant and to explore exciting features. You no need to register, log in by placeholder will auto sign up for you.',
}

export function LoginThirdPartyArea() {
    const navigate = useNavigate();
    const onClickToNavigate = (route: any, push: boolean) => {
        if (push) {
            navigate(route);
        } else {
            window.location.href = route;
        }
    };
    return (
        <div className={twJoin(
            'mt-32 relative h-full',
            'transition-all duration-500 ease-in-out',
            'flex flex-col items-center justify-center gap-8',
        )}>
            <div>
                <Typography
                    variant={'h1'}
                    className={twMerge(
                        'text-6xl',
                        'font-bold',
                        'text-center',
                        'text-grvd-theme-sys-dark-primary',
                        'mt-10',
                    )}
                >
                    Welcome to <br/> Graviad
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={twMerge(
                        'text-center text-base break-words font-normal text-grvd-theme-sys-dark-on-secondary-variant',
                        'max-w-[30em]'
                    )}
                >
                    {ListContentOfLoginPage.DESCRIPTION}
                </Typography>
            </div>
            <div className={twMerge(
                'flex flex-row gap-8 items-center',
                'w-full'
            )}>
                <Button
                    colorcustom={'secondary'}
                    sizecustom={'lg'}
                    className={'w-full items-center flex flex-row gap-2 justify-center'}
                    onClick={() => {
                        onClickToNavigate(config.server.url + '/auth/google', false);
                    }}
                >
                    <FaGoogle size={24}/>
                    Google
                </Button>

                <Button colorcustom={'secondary'}
                        sizecustom={'lg'}
                        className={'w-full items-center flex flex-row gap-2 justify-center'}
                        onClick={() => {
                            onClickToNavigate(config.server.url + '/auth/facebook', false);
                        }}
                >
                    <FaSquareFacebook size={24}/>
                    Facebook
                </Button>
            </div>
        </div>
    );

}

export function LoginPage() {
    return (
        <div>
            <LoginThirdPartyArea/>
            <div
                className={twJoin(
                    'w-full h-[50vh]',
                    'bg-[linear-gradient(180deg,_rgba(2,_103,_255,_0.25)_0%,_rgba(248,_4,_253,_0.25)_100%)] blur-[300px] -z-20',
                    'rounded-full',
                    'absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
                )}
            />
        </div>
    )
}