import React from 'react';
import {useForm} from 'react-hook-form';
import {twJoin, twMerge} from "tailwind-merge";
import {Input} from "grvd/components";
import {Button} from "grvd/components";
import config from "../../../config";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Typography} from "@material-tailwind/react";

export function Login() {
    const navigate = useNavigate();
    const onClickToNavigate = (route: any, push: boolean) => {
        if (push) {
            navigate(route);
        } else {
            window.location.href = route;
        }
    };
    return (
        <div className={'mt-32 relative'}>
            <div className={twMerge(
                'absolute top-0 translate-x-1/2 w-[200px] h-[200px] rounded-full',
                'bg-[linear-gradient(180deg,_rgba(0,_125,_195,_0.80)_40%,_rgba(174,_2,_255,_0.80)_100%)]',
                'blur-[100px]',
            )}/>
            <form className={twMerge(
                'flex flex-col gap-4 items-center justify-center',
                'p-6',
                'bg-grvd-theme-sys-dark-primary/10 backdrop-blur-[2.5px]',
                'rounded-lg',
            )}>
                <div>
                    <Typography
                        // variant={'h1'}
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
                    <p
                        // variant={'paragraph'}
                        className={twMerge(
                            'text-base',
                            'text-center',
                            'font-normal',
                            'text-grvd-theme-sys-dark-on-secondary-variant',
                        )}
                    >
                        Log in to explore exciting features
                    </p>
                </div>
                <Input
                    placeholder={'Username'}
                    inputMode={'text'}
                />
                <Input
                    placeholder={'Password'}
                />
                <Button
                    type={'submit'}
                    colorCustom={'primary'}
                    sizeCustom={'lg'}

                    className={'w-full'}
                >Login</Button>
                <div className={'flex flex-row justify-center items-center w-full gap-4'}>
                    <hr className={'w-full h-[0.5px] border-grvd-theme-sys-dark-on-secondary-variant'}/>
                    <p
                        className={twJoin(
                            'text-base',
                            'text-center',
                            'font-normal',
                            'text-nowrap',
                            'text-grvd-theme-sys-dark-on-secondary-variant',
                        )}
                    >or continue with</p>
                    <hr className={'w-full h-[0.5px] border-grvd-theme-sys-dark-on-secondary-variant'}/>
                </div>
                <div className={twMerge(
                    'flex flex-row gap-4 items-center',
                    'w-full'
                )}>
                    <Button
                        colorCustom={'secondary'}
                        sizeCustom={'lg'}
                        className={'w-full'}
                        onClick={() => {
                            onClickToNavigate(config.server.url + '/auth/google', false);
                        }}
                    >
                        Google
                    </Button>

                    <Button colorCustom={'secondary'} sizeCustom={'lg'}
                            className={'w-full'}>
                        <Link to={config.server.url + '/auth/facebook'}>
                            Facebook
                        </Link>
                    </Button>
                </div>
            </form>

        </div>
    );
}