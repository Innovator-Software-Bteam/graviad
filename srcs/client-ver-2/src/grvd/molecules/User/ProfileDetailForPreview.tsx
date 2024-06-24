import {Typography} from "@material-tailwind/react";
import {useMerchant, useUser} from "grvd/pages";
import {twJoin} from "tailwind-merge";
import {FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa";
import {ProfileCard} from "grvd/molecules";
import React, {useEffect, useState} from "react";
import {AvatarBase64} from "grvd/components";
import axios from "axios";
import config from "../../../config";
import {TTemplate} from "grvd/molecules/Template/types";
import {TemplateContext} from "grvd/molecules/Template/TemplateContext";


export function ProfileDetailForPreview() {
    const merchant = useMerchant();
    const [templateProfileCard, setTemplateProfileCard] = useState<TTemplate>();
    const loadTemplateProfileCard = () => {
        if (!merchant?.usingTemplateProfileCardId) return;
        axios.get(`${config.server.url}/templates/${merchant?.usingTemplateProfileCardId}`, {
            withCredentials: true,
        })
            .then((res) => {
                setTemplateProfileCard(res.data);
            })
            .catch();
    }
    useEffect(() => {
        loadTemplateProfileCard();
    }, [merchant]);
    return (
        <div
            className={'w-full h-full relative'}
            id={'profile-detail-for-preview' + merchant?.id}
        >
            <img
                src={'/assets/profile_view_effect.png'}
                alt={'ProfilePage view effect'}
                className={twJoin(
                    'absolute top-[35%] left-0',
                    'w-full h-full object-cover',
                    'z-[-1]'
                )}
            />
            <div className={twJoin(
                'relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2',
                'flex flex-col items-center gap-4',
                'w-fit h-fit p-8 rounded-[32px] mt-32 max-w-[600px]',
                'bg-grvd-theme-sys-dark-surface-container-higher/25 backdrop-blur-[50px]',
                'break-words'
            )}
            >
                <div/>
                {
                    merchant?.avatar?.data &&
                    <AvatarBase64
                        data={merchant.avatar.data}
                        alt={merchant.avatar.alt_texts?.join(' ')}
                        variant={'rounded'}
                        size={'xxl'}
                        className={twJoin(
                            'rounded-lg bg-grvd-theme-sys-dark-surface-container-lower',
                            'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
                        )}
                    />
                }
                <div className={twJoin(
                    'flex flex-col items-center gap-8',
                    'mt-5'
                )}>

                    <Typography className={'text-grvd-theme-sys-dark-primary text-center font-bold'} variant={'h1'}>
                        {merchant?.name}
                    </Typography>
                    <Typography variant={'small'} className={'text-grvd-theme-sys-dark-primary text-center'}>
                        | {merchant?.slogan} |
                    </Typography>
                    <Typography className={twJoin(
                        'bg-grvd-theme-sys-dark-surface-container-higher/25 rounded-md text-grvd-theme-sys-dark-primary',
                        'font-medium text-center',
                        'p-2'
                    )}>
                        Merchant
                    </Typography>
                    <Typography className={'text-grvd-theme-sys-dark-on-primary-variant text-center'}
                                variant={'paragraph'}>
                        {merchant?.description}
                    </Typography>
                    <Typography
                        className={'flex flex-row gap-2 text-grvd-theme-sys-dark-primary items-center justify-start w-full'}>
                        <FaFacebookF size={20}/>
                        {merchant?.socialLinks?.find(link => link.provider === 'facebook')?.data || 'No Facebook'}
                    </Typography>
                    <Typography
                        className={'flex flex-row gap-2 text-grvd-theme-sys-dark-primary items-center justify-start w-full'}>
                        <FaTwitter size={20}/>
                        {merchant?.socialLinks?.find(link => link.provider === 'twitter')?.data || 'No Twitter'}
                    </Typography>
                    <Typography
                        className={'flex flex-row gap-2 text-grvd-theme-sys-dark-primary items-center justify-start w-full'}>
                        <FaInstagram size={20}/>
                        {merchant?.socialLinks?.find(link => link.provider === 'instagram')?.data || 'No Instagram'}
                    </Typography>
                    <ProfileCard typeCustom={templateProfileCard?.templateType}/>
                </div>
            </div>
        </div>
    );
}