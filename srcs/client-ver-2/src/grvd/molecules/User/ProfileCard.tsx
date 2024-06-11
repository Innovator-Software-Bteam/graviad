import React, {useEffect} from 'react';
import {useMerchant} from "grvd/pages";
import {tv} from "tailwind-variants";
import {Avatar, Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";
import {Buffer} from "buffer";
import {AvatarBase64} from "grvd/components/Avatar";

export type TStyleCard = 'simple' | 'luxury' | 'glass' | 'modern';

export interface IProfileCardProps extends React.ComponentProps<'div'> {
    typeCustom?: TStyleCard;
}

const baseCard = tv({
    base: twJoin(
        'w-full min-w-[500px] aspect-[5/3] p-8 rounded-3xl',
        'flex flex-col items-center justify-between',
        'relative',
    ),
    variants: {
        simple: 'bg-gray-100',
        luxury: 'bg-gray-200',
        glass: 'bg-gray-300',
        modern: 'bg-gray-400',
    }
});

export function ProfileCard(props: IProfileCardProps) {
    const {typeCustom, className} = props;
    const merchant = useMerchant();
    const contactItems = {
        phone: {
            title: 'Phone',
            value: merchant?.phone,
        },
        email: {
            title: 'Email',
            value: merchant?.email,
        }
    };
    const renderContactItem = (item: typeof contactItems[keyof typeof contactItems]) => {
        return (
            <div>
                <Typography
                    variant={'lead'}
                    className={twJoin(
                        'text-grvd-theme-sys-dark-primary font-semibold',
                    )}
                >
                    {item.title}
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={twJoin(
                        'text-grvd-theme-sys-dark-primary',
                    )}
                >
                    {item.value}
                </Typography>
            </div>
        );
    }
    useEffect(() => {
    }, [merchant]);
    return (
        <div className={twJoin(
            baseCard({className: typeCustom}),
            'bg-[rgb(255,255,255)]/10 backdrop-blur-[50px]',
            'shadow-xl overflow-clip z-10',
            'relative',
            className
        )}
             id={'profile-card-' + merchant?.id}
        >
            {typeCustom === 'glass' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 501 300"
                     fill="none"
                     className={'absolute top-0 left-0 z-[-1]'}
                >
                    <g filter="url(#filter0_f_1099_349)">
                        <path
                            d="M20.7733 32.1589C19.5119 18.1131 30.5748 6.0122 44.6771 6.0122L315.205 6.01221C320.579 6.01222 325.797 7.81547 330.024 11.1332L395.236 62.3193C401.033 66.869 404.418 73.8294 404.418 81.1983L404.418 176.631C404.418 186.498 398.379 195.36 389.194 198.969L301.325 233.492C297.674 234.926 293.727 235.444 289.83 235L55.8298 208.321C44.514 207.03 35.6633 197.965 34.6446 186.622L20.7733 32.1589Z"
                            fill="url(#paint0_linear_1099_349)"/>
                    </g>
                    <defs>
                        <filter id="filter0_f_1099_349" x="-79.3247" y="-93.9878" width="583.743"
                                height="429.142" filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_1099_349"/>
                        </filter>
                        <linearGradient id="paint0_linear_1099_349" x1="83.5325" y1="1.03662" x2="251.374"
                                        y2="173.106" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F14FFF"/>
                            <stop offset="0.495" stopColor="#866DFE"/>
                            <stop offset="1" stopColor="#0093FD"/>
                        </linearGradient>
                    </defs>
                </svg>
            )}
            <div className={'w-full flex flex-row justify-between items-center'}>
                <div>
                    <Typography
                        variant={'h4'}
                        className={twJoin(
                            'w-full text-left text-grvd-theme-sys-dark-primary font-bold uppercase',
                        )}>
                        {merchant?.name}
                    </Typography>
                    <Typography
                        variant={'small'}
                        className={twJoin(
                            'w-full text-left text-grvd-theme-sys-dark-primary',
                            'bg-white/10 rounded-md px-2 py-1',
                        )}>
                        | {merchant?.slogan}
                    </Typography>
                </div>
                {
                    merchant?.avatar && (
                        <AvatarBase64
                            data={merchant.avatar.data}
                            variant={'rounded'}
                            className={twJoin(
                                'w-16 h-16',
                            )}
                        />
                    )
                }
            </div>
            <div className={'w-full flex flex-row justify-between'}>
                {Object.values(contactItems).map(renderContactItem)}
            </div>
        </div>
    )
}