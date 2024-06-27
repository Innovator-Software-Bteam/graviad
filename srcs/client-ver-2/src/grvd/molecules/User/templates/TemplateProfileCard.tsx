import React, {useEffect} from 'react';
import {useMerchant} from "grvd/pages";
import {tv} from "tailwind-variants";
import {Avatar, Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";
import {Buffer} from "buffer";
import {AvatarBase64} from "grvd/components/Avatar";
import {TSocialLink} from "grvd";

export type TStyleCard = 'simple' | 'luxury' | 'glass' | 'modern';

export interface IBrandNameProps extends React.ComponentProps<'div'> {

}

export interface ISloganProps extends React.ComponentProps<'div'> {

}

export interface IContainerProps extends React.ComponentProps<'div'> {

}

export interface IContactProps extends React.ComponentProps<'div'> {

}

export interface IAddressProps extends React.ComponentProps<'div'> {

}

export interface IThirdPartyIconProps extends React.ComponentProps<'div'> {

}

export interface IBackgroundProps extends React.ComponentProps<'div'> {

}

export interface ISurfaceProps extends React.ComponentProps<'div'> {

}

export interface IProfileCardProps extends React.ComponentProps<'div'> {
    typeCustom?: TStyleCard;
    brandNameProps?: IBrandNameProps;
    sloganProps?: ISloganProps;
    containerProps?: IContainerProps;
    contactProps?: IContactProps;
    addressProps?: IAddressProps;
    thirdPartyIconProps?: IThirdPartyIconProps;
    surfaceProps?: ISurfaceProps;
    backgroundProps?: IBackgroundProps;
}

const baseCard = tv({
    base: twJoin(
        'w-full min-w-[300px] aspect-[5/3] p-8 rounded-3xl',
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

export function TemplateProfileCard(props: IProfileCardProps) {
    const {
        typeCustom,
        className,
        addressProps,
        brandNameProps,
        contactProps,
        thirdPartyIconProps,
        sloganProps,
        surfaceProps,
        backgroundProps
    } = props;
    const merchant = useMerchant();
    useEffect(() => {
    }, [merchant]);
    return (
        <div className={twJoin(
            baseCard({className: typeCustom}),
            // 'bg-[rgb(255,255,255)]/10 backdrop-blur-[50px]',
            // 'shadow-xl overflow-clip z-10',
            // 'relative',
            backgroundProps?.className,
        )}
             id={'profile-card-' + merchant?.id}
        >
            {surfaceProps?.children}
            <div className={'w-full flex flex-row justify-between items-center'}>
                <div>
                    <Typography
                        variant={'h4'}
                        className={twJoin(
                            'w-full text-left text-grvd-theme-sys-dark-primary font-bold uppercase',
                            brandNameProps?.className,
                        )}>
                        {merchant?.name}
                    </Typography>
                    <Typography
                        variant={'small'}
                        className={twJoin(
                            'w-full text-left text-grvd-theme-sys-dark-primary',
                            'bg-white/10 rounded-md px-2 py-1',
                            sloganProps?.className,
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
            <div className={'w-full flex flex-row justify-between items-end gap-4'}>
                <Typography
                    className={twJoin(
                        'text-grvd-theme-sys-dark-primary break-words',
                        addressProps?.className,
                    )}
                >
                    {merchant?.address?.toUpperCase()}
                </Typography>
                <div className={'w-fit flex flex-col gap-4'}>
                    <Typography
                        className={twJoin(
                            contactProps?.className,
                        )}
                    >
                        {merchant?.phone} | {merchant?.email}
                    </Typography>
                    {merchant?.socialLinks && (
                        merchant.socialLinks.map((link: TSocialLink, index) => {
                            return (
                                <Typography key={index}
                                            className={twJoin(
                                                contactProps?.className,
                                            )}
                                >
                                    {link.data}
                                </Typography>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
export function TemplateProfileCardGlass(props: IProfileCardProps) {
    return (
        <TemplateProfileCard
            backgroundProps={{
                className: twJoin(
                    'bg-[rgb(255,255,255)]/10 backdrop-blur-[100px]',
                    'shadow-xl overflow-clip z-10',
                    'relative',
                ),
            }}
            surfaceProps={{
                children: (
                    <>
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
                        {/*<div*/}
                        {/*    className={twJoin(*/}
                        {/*        'absolute top-0 left-0 -z-50',*/}
                        {/*        'w-[110%] h-[110%]',*/}
                        {/*        'bg-black'*/}
                        {/*    )}*/}
                        {/*/>*/}
                    </>
                )
            }}
            contactProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-primary',
                    'text-xs',
                ),
            }}
            addressProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-primary',
                    'text-xs',
                ),
            }}
        />
    );
}

export function TemplateProfileCardSimple(props: IProfileCardProps) {
    return (
        <TemplateProfileCard
            backgroundProps={{
                className: twJoin(
                    'bg-[rgb(255,255,255)]/10 backdrop-blur-[50px]',
                    'shadow-xl overflow-clip z-10',
                    'relative',
                ),
            }}
            contactProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-primary',
                    'text-xs',
                ),
            }}
            addressProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-primary',
                    'text-xs',
                ),
            }}
        />
    );
}

export function TemplateProfileCardWhiteSmooth(props: IProfileCardProps) {
    return (
        <TemplateProfileCard
            backgroundProps={{
                className: twJoin(
                    'bg-[#E6E6E6]',
                    'shadow-xl overflow-clip z-10',
                    'relative',
                ),
            }}
            brandNameProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-secondary font-bold',
                ),
            }}
            contactProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-secondary',
                    'text-xs',
                ),
            }}
            addressProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-secondary',
                    'text-xs',
                ),
            }}
            sloganProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-secondary',
                ),
            }}
            surfaceProps={{
                children: (
                    <svg width="408" height="285" viewBox="0 0 408 285" fill="none" xmlns="http://www.w3.org/2000/svg"
                         className={'absolute top-0 left-0 z-[-1]'}
                    >
                        <g filter="url(#filter0_f_1505_828)">
                            <path
                                d="M13.1057 34.2133C11.8444 20.1676 22.9073 8.06665 37.0095 8.06665L237.205 8.06666C242.579 8.06666 247.797 9.86991 252.023 13.1876L298.581 49.7311C304.378 54.2808 307.763 61.2412 307.763 68.6101L307.763 135.58C307.763 145.447 301.723 154.309 292.539 157.917L229.719 182.599C226.068 184.033 222.121 184.551 218.224 184.107L44.0196 164.245C32.7038 162.955 23.8531 153.89 22.8344 142.546L13.1057 34.2133Z"
                                fill="url(#paint0_linear_1505_828)"/>
                        </g>
                        <defs>
                            <filter id="filter0_f_1505_828" x="-86.9924" y="-91.9333" width="494.755" height="376.195"
                                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_1505_828"/>
                            </filter>
                            <linearGradient id="paint0_linear_1505_828" x1="60.8549" y1="4.23815" x2="198.5" y2="186"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#B402C3"/>
                                <stop offset="0.438136" stopColor="#FF6948"/>
                                <stop offset="1" stopColor="#03C2FE"/>
                            </linearGradient>
                        </defs>
                    </svg>
                )
            }}
        />
    );
}

export function TemplateProfileCardBlack(props: IProfileCardProps) {
    return (
        <TemplateProfileCard
            backgroundProps={{
                className: twJoin(
                    'bg-[#E6E6E6]',
                    'shadow-xl overflow-clip z-10',
                    'relative',
                ),
            }}
            brandNameProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-secondary font-bold',
                ),
            }}
            contactProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-secondary',
                    'text-xs',
                ),
            }}
            addressProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-secondary',
                    'text-xs',
                ),
            }}
            sloganProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-secondary',
                ),
            }}
            surfaceProps={{
                children: (
                    <svg width="408" height="285" viewBox="0 0 408 285" fill="none" xmlns="http://www.w3.org/2000/svg"
                         className={'absolute top-0 left-0 z-[-1]'}
                    >
                        <g filter="url(#filter0_f_1505_828)">
                            <path
                                d="M13.1057 34.2133C11.8444 20.1676 22.9073 8.06665 37.0095 8.06665L237.205 8.06666C242.579 8.06666 247.797 9.86991 252.023 13.1876L298.581 49.7311C304.378 54.2808 307.763 61.2412 307.763 68.6101L307.763 135.58C307.763 145.447 301.723 154.309 292.539 157.917L229.719 182.599C226.068 184.033 222.121 184.551 218.224 184.107L44.0196 164.245C32.7038 162.955 23.8531 153.89 22.8344 142.546L13.1057 34.2133Z"
                                fill="url(#paint0_linear_1505_828)"/>
                        </g>
                        <defs>
                            <filter id="filter0_f_1505_828" x="-86.9924" y="-91.9333" width="494.755" height="376.195"
                                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_1505_828"/>
                            </filter>
                            <linearGradient id="paint0_linear_1505_828" x1="60.8549" y1="4.23815" x2="198.5" y2="186"
                                            gradientUnits="userSpaceOnUse">
                                <stop stopColor="#B402C3"/>
                                <stop offset="0.438136" stopColor="#FF6948"/>
                                <stop offset="1" stopColor="#03C2FE"/>
                            </linearGradient>
                        </defs>
                    </svg>
                )
            }}
        />
    );
}