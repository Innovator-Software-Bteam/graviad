import {useSelector} from "react-redux";
import {UserCounterState} from "../../storage/counters/UserCounter";
import {Avatar, Card, Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {twJoin, twMerge} from "tailwind-merge";
import {Button} from "grvd/components";
import {FaAngleDown, FaUser} from "react-icons/fa";
import {useEffect, useState} from "react";
import {IoLogOut} from "react-icons/io5";
import config from "../../../config";
import {useProfile} from "grvd/pages";

export type TProfileItem = {
    title: string;
    icon: any;
    link: string;
}

export function UserProfileShortcut() {
    const profile = useProfile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const profileItems: TProfileItem[] = [
        {
            title: 'Profile',
            icon: <FaUser size={16}/>,
            link: '/dashboard/profile'
        },
        {
            title: 'Logout',
            icon: <IoLogOut size={16}/>,
            link: config.server.url + '/auth/logout',
        }
    ]
    const renderProfileItems = (item: TProfileItem, index: any) => {
        const {title, icon, link} = item;
        return (
            <MenuItem
                key={index + title}
                className={twMerge(
                    'hover:bg-grvd-theme-sys-dark-surface-container-high',
                    'hover:text-grvd-theme-sys-dark-primary',
                    'focus:bg-grvd-theme-sys-dark-surface-container-high',
                    'focus:text-grvd-theme-sys-dark-primary',
                    'active:bg-grvd-theme-sys-dark-surface-container-high',
                    'active:text-grvd-theme-sys-dark-primary',

                    'flex flex-row items-center justify-start gap-2',
                )}>
                {icon}
                <Typography as={'a'} variant="small" className="font-medium" href={link}>
                    {title}
                </Typography>
            </MenuItem>
        )
    };
    useEffect(() => {
    }, [profile]);
    return (
        <Card className={twJoin(
            'flex flex-row gap-4',
            'items-center',
            'justify-between',
            'p-4',
            'rounded-lg',
            'w-fit',
            'bg-grvd-theme-sys-dark-surface-container',
        )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            <Menu
                placement={'bottom-end'}
                offset={20}
                handler={setIsMenuOpen}
                open={isMenuOpen}
                allowHover={true}
            >
                {
                    profile?.photos &&
                    <Avatar
                        withBorder={true}
                        src={profile.photos[0].value || undefined}
                        alt={profile.displayName}
                        variant={'circular'}
                        size={'sm'}
                        className={twJoin(
                            'outline-grvd-theme-sys-dark-tertiary outline outline-offset-[1px]',
                        )}
                    />
                }
                <MenuHandler>
                    <Button colorCustom={'secondary'} className={'!bg-transparent'}>
                        <FaAngleDown
                            size={20}
                            className={twJoin(
                                'text-grvd-theme-sys-dark-on-primary-variant',
                                'hover:text-grvd-theme-sys-dark-primary',
                                'transition-colors duration-200 ease-in-out',
                                `h-3.5 w-3.5 transition-transform ${
                                    isMenuOpen ? "rotate-180" : ""
                                }`
                            )}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className={twJoin(
                    'bg-grvd-theme-sys-dark-surface-container/90',
                    'backdrop-blur-lg',
                    'rounded-lg',
                    'border-none',
                    'shadow-none',

                    'text-grvd-theme-sys-dark-on-primary-variant',
                    'text-md',
                )}>
                    {profileItems.map((item, index) => renderProfileItems(item, index))}
                </MenuList>
            </Menu>
        </Card>
    )
}