import React, {useEffect} from 'react';
import {TMerchant, TUser} from "grvd";
import {Avatar, Popover, PopoverContent, PopoverHandler, Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";
import {CiHeart} from "react-icons/ci";
import {FaRegHeart} from "react-icons/fa6";
import {ProfileCard} from "grvd/molecules/User/ProfileCard";
import {MerchantContext, ProfileContext} from "grvd/contexts";

export interface IProfileOwnerBarProps extends React.ComponentProps<'div'> {
    user: TUser;
}

export function ProfileOwnerBar({user, ...props}: IProfileOwnerBarProps) {
    const [openPopover, setOpenPopover] = React.useState(false);
    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };
    const handleNavigate = () => {
        window.location.href = `/dashboard/profile/${user.merchant?.id}`;
    }
    useEffect(() => {
    }, [user, user.profile, user.merchant]);
    return (
        <ProfileContext.Provider value={user.profile}>
            <MerchantContext.Provider value={user.merchant}>
                <div className={twJoin(
                    'flex flex-row justify-between',
                    'p-4 rounded-lg',
                    'bg-white/5',
                    'transition-all duration-200 ease-in-out',
                )}
                     onClick={handleNavigate}
                >
                    <div className={'flex flex-row gap-4 items-center'}>
                        {user?.profile?.photos &&
                            <Popover placement={'bottom'} open={openPopover} handler={setOpenPopover} offset={10}>
                                <PopoverHandler {...triggers}>
                                    <Avatar
                                        src={user?.profile?.photos[0].value}
                                        variant={'rounded'}
                                        size={'md'}
                                    />
                                </PopoverHandler>
                                <PopoverContent {...triggers}
                                                className={'bg-transparent border-none shadow-none outline-none'}>
                                    <ProfileCard typeCustom={'simple'}/>
                                </PopoverContent>
                            </Popover>
                        }
                        <div className={'border-l-2 rounded-full border-grvd-theme-sys-dark-outline solid h-[80%]'}/>
                        <div>
                            <Typography variant={'h6'}
                                        className={'text-grvd-theme-sys-dark-primary'}>{user?.merchant?.name}</Typography>
                            <Typography variant={'small'}
                                        className={'text-grvd-theme-sys-dark-on-primary-variant font-medium'}>Merchant</Typography>
                        </div>
                    </div>
                    <Typography variant={'paragraph'} className={twJoin(
                        'text-grvd-theme-sys-dark-tertiary flex flex-row gap-2 items-center text-lg font-medium',
                        '[text-shadow:0px_0px_10px_#1A5DCD]'
                    )}>
                        <FaRegHeart size={20} className={'[filter:drop-shadow(0px_0px_10px_#1A5DCD)]'}/>
                        {user?.merchant?.numberOfProducts}
                    </Typography>
                    {props.children}
                </div>
            </MerchantContext.Provider>
        </ProfileContext.Provider>
    );
}