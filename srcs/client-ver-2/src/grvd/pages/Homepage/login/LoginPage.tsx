import React from 'react';
import {twJoin, twMerge} from "tailwind-merge";
import {Button} from "grvd/components/index";
import config from "../../../../config";
import {useNavigate} from "react-router-dom";
import {Typography} from "@material-tailwind/react";
import {FaSquareFacebook} from "react-icons/fa6";
import {FaGoogle} from "react-icons/fa";
import {useUser} from "grvd/contexts";

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
            <div className={'flex flex-col items-center justify-center gap-2 w-full'}>
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
                    Welcome <br/>
                    to Graviad
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
                'flex flex-col gap-4 items-center',
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
            <Typography
                variant={'paragraph'}
                className={twMerge(
                    'text-center text-base break-words font-normal text-grvd-theme-sys-dark-on-secondary-variant',
                    'max-w-[30em]'
                )}
            >
                By clicking on the button above, you agree to Graviad's <u><a
                href={'/privacy'}>Privacy Policy</a></u>.
            </Typography>
        </div>
    );

}

export function LoginPage() {
    const user=useUser();
    const navigate = useNavigate();
    if(user){
        navigate('/dashboard');
    }
    return (
        <div className={twJoin(
            'min-h-[100vh] h-full px-16',
            'sm:px-16 md:px-[20vw] lg:px-[30vw] xl:px-[40vw]',
            'relative'
        )}>
            <LoginThirdPartyArea/>
            <div className={twJoin(
                'w-[50%] h-[80vh] -translate-y-1/2 rounded-full',
                'bg-gradient-to-b from-[#0029FF] from-22.3% to-rgba(0,41,255,0.50) to-56.32% blur-[200px]',
                'absolute -top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-20',
            )}/>
        </div>
    )
}