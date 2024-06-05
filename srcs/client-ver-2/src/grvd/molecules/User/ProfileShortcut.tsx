import {Avatar, Card, Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {twJoin, twMerge} from "tailwind-merge";
import {Button} from "grvd/components";
import {FaAngleDown, FaUser} from "react-icons/fa";
import {useEffect, useState} from "react";
import {IoLogOut} from "react-icons/io5";
import config from "../../../config";
import {useMerchant, useProfile} from "grvd/pages";
import {useSelector} from "react-redux";
import {RootState} from "grvd/storage";

export type TProfileItem = {
    title: string;
    icon: any;
    link: string;
}

export function ProfileShortcut() {
    const [loginWindow, setLoginWindow] = useState<Window | null>(null);
    const profile = useProfile();
    const merchant = useMerchant();
    const state=useSelector((state: RootState) => state.state.state);
    const handleLogin = () => {
        const win = window.open(config.server.url + '/auth/google','_self', 'width=500,height=600,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=50%,top=50%');
        setLoginWindow(win);
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const profileItems: TProfileItem[] = [
        {
            title: 'Profile',
            icon: <FaUser size={16}/>,
            link:  `/dashboard/profile/${merchant?.id}`,
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
    }, [state]);
    if(!state.isAuthenticated) return (
        <Button colorcustom={'primary'} sizecustom={'lg'} onClick={handleLogin}>
            Login
        </Button>
    )
    return (
        <Card className={twJoin(
            'flex flex-row gap-2 items-center justify-between',
            'p-4 w-fit',
            'rounded-lg',
            'bg-transparent',
        )}
              shadow={false}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
            <Menu
                placement={'bottom-end'}
                offset={30}
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
                    <Button colorcustom={'secondary'} sizecustom={'sm'} className={'!bg-transparent outline-none border-none'}>
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
                    'bg-grvd-theme-sys-dark-surface-container/50',
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
    );
}