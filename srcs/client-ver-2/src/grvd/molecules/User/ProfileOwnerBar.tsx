import React, {MouseEvent, useEffect} from 'react';
import {TMerchant, TUser} from "grvd";
import {Popover, PopoverContent, PopoverHandler, Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";
import {FaRegHeart} from "react-icons/fa6";
import {ProfileCard} from "grvd/molecules/User/ProfileCard";
import {MerchantContext, ProfileContext, useUser} from "grvd/contexts";
import axios from "axios";
import config from "../../../config";
import {AvatarBase64} from "grvd/components/Avatar";
import {ProtectedFeatureRequiredLogin} from "grvd/protected";
import {Button} from "grvd/components/Button";

export interface IProfileOwnerBarProps extends React.ComponentProps<'div'> {
    owner: TMerchant;
}

export function ProfileOwnerBar({owner, ...props}: IProfileOwnerBarProps) {
    const [openPopover, setOpenPopover] = React.useState(false);
    const user = useUser();
    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };
    const [merchant, setMerchant] = React.useState<TMerchant>({});
    const [followingMerchantIds, setFollowingMerchantIds] = React.useState<string []>([]);

    const handleNavigate = () => {
        window.location.href = `/dashboard/profile/${owner.id}`;
    }
    const handleFollow = (e: MouseEvent) => {
        if (!user) return;
        e.stopPropagation();
        if (owner) {
            axios
                .post(`${config.server.url}/users/${user?.id}/follow_merchant/${owner?.id}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    const user: TUser = res.data;
                    if(user.followingMerchantIds) setFollowingMerchantIds(user.followingMerchantIds);
                });
        }
    }
    const handleUnfollow = (e: MouseEvent) => {
        e.stopPropagation();
        if (!user) return;
        if (owner) {
            axios
                .delete(`${config.server.url}/users/${user?.id}/unfollow_merchant/${owner?.id}`, {
                    withCredentials: true,
                })
                .then((res) => {
                    const user: TUser = res.data;
                    if(user.followingMerchantIds) setFollowingMerchantIds(user.followingMerchantIds);
                });
        }
    }
    useEffect(() => {
        if (user?.followingMerchantIds) {
            setFollowingMerchantIds(user?.followingMerchantIds);
        }
    }, [user]);
    return (
        <MerchantContext.Provider value={owner}>
            <div className={twJoin(
                'flex flex-row justify-between',
                'p-4 rounded-lg',
                // 'bg-white/5',
                'transition-all duration-200 ease-in-out',
                'cursor-pointer',
            )}
                 onClick={handleNavigate}
            >
                <div className={'flex flex-row gap-4 items-center'}>
                    {owner?.avatar &&
                        <Popover placement={'bottom'} open={openPopover} handler={setOpenPopover} offset={10}>
                            <PopoverHandler {...triggers}>
                                <AvatarBase64
                                    data={owner?.avatar.data}
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
                                    className={'text-grvd-theme-sys-dark-primary'}>{owner?.name}</Typography>
                        <Typography variant={'small'}
                                    className={'text-grvd-theme-sys-dark-on-primary-variant font-medium'}>Merchant</Typography>
                    </div>
                </div>
                {
                    user?.merchant?.id !== owner?.id &&
                    <ProtectedFeatureRequiredLogin>
                        {
                            followingMerchantIds.includes(owner?.id as any) ?
                                <Button colorcustom={'secondary'} sizecustom={'lg'} onClick={handleUnfollow}>
                                    {
                                        'Unfollow'
                                    }
                                </Button>
                                :
                                <Button colorcustom={'primary'} sizecustom={'lg'} onClick={handleFollow}>
                                    {
                                        '+ Follow'
                                    }
                                </Button>
                        }
                    </ProtectedFeatureRequiredLogin>
                }
                {props.children}
            </div>
        </MerchantContext.Provider>
    );
}