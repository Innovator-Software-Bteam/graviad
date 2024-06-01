import {Avatar, Typography} from "@material-tailwind/react";
import {useMerchant, useProfile} from "grvd/pages";
import {twJoin} from "tailwind-merge";
import {FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa";
import {ProfileCard} from "grvd/molecules/User/ProfileCard";

export function ProfileDetailForPreview() {
    const profile = useProfile();
    const merchant = useMerchant();
    return (


        <div className={twJoin(
            'relative',
            'flex flex-col items-center gap-4',
            'w-fit h-fit p-8 rounded-[32px] mt-32 max-w-[600px]',
            'bg-grvd-theme-sys-dark-surface-container-higher/25 backdrop-blur-[50px]',
            'break-words'
        )}
        >
            <div/>
            {profile?.photos && (
                <Avatar
                    src={profile?.photos[0].value}
                    variant={'rounded'}
                    size={'xxl'}
                    className={twJoin(
                        'rounded-lg bg-grvd-theme-sys-dark-surface-container-lower',
                        'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
                    )}
                />
            )}
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
                    {merchant?.socialLinks?.find(link => link.provider === 'twitter')?.data || 'No Twitter justify-start w-full'}
                </Typography>
                <Typography
                    className={'flex flex-row gap-2 text-grvd-theme-sys-dark-primary items-center justify-start w-full'}>
                    <FaInstagram size={20}/>
                    {merchant?.socialLinks?.find(link => link.provider === 'instagram')?.data || 'No Instagram'}
                </Typography>
                <ProfileCard typeCustom={'glass'}/>
            </div>
        </div>

    );
}