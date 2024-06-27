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
import {TTemplate} from "grvd/molecules/Template/types";

export interface IProfileOwnerBarProps extends React.ComponentProps<'div'> {
    owner: TMerchant;
    hideFollowButton?: boolean;
}

export function ProfileOwnerBar({owner, ...props}: IProfileOwnerBarProps) {
    const {hideFollowButton = false} = props;
    const [openPopover, setOpenPopover] = React.useState(false);
    const user = useUser();
    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };
    const [followingMerchantIds, setFollowingMerchantIds] = React.useState<string []>([]);
    const [templateProfileCard, setTemplateProfileCard] = React.useState<TTemplate>();
    const loadTemplateProfileCard = () => {
        if (!owner?.usingTemplateProfileCardId) return;
        axios.get(`${config.server.url}/templates/${owner?.usingTemplateProfileCardId}`, {
            withCredentials: true,
        })
            .then((res) => {
                setTemplateProfileCard(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const handleNavigate = () => {
        window.location.href = `/dashboard/profile/${owner.id}`;
    };
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
                    if (user.followingMerchantIds) setFollowingMerchantIds(user.followingMerchantIds);
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
                    if (user.followingMerchantIds) setFollowingMerchantIds(user.followingMerchantIds);
                });
        }
    }
    useEffect(() => {
        if (user?.followingMerchantIds) {
            setFollowingMerchantIds(user?.followingMerchantIds);
        }
    }, [user]);
    useEffect(() => {
        loadTemplateProfileCard();
    }, [owner]);
    return (
        <MerchantContext.Provider value={owner}>
            <div className={twJoin(
                'w-full',
                'flex flex-row justify-between items-center gap-4',
                'py-4 rounded-lg',
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
                                    src={'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                                />
                            </PopoverHandler>
                            <PopoverContent {...triggers}
                                            className={'bg-transparent border-none shadow-none outline-none'}>
                                <ProfileCard
                                    typeCustom={templateProfileCard?.templateType}
                                />
                            </PopoverContent>
                        </Popover>
                    }
                    <div className={'h-[75%] w-[2px] rounded-full bg-grvd-theme-sys-dark-primary/10'}/>
                    <div>
                        <Typography variant={'h6'}
                                    className={'text-grvd-theme-sys-dark-primary'}>{owner?.name}</Typography>
                        <Typography variant={'small'}
                                    className={'text-grvd-theme-sys-dark-on-primary-variant font-medium'}>Merchant</Typography>
                    </div>
                </div>
                {
                    (!hideFollowButton && user?.merchant?.id !== owner?.id) &&
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
                                        '+Follow'
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