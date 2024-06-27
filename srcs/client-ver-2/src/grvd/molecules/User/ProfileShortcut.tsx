import {Avatar, Card, Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {twJoin, twMerge} from "tailwind-merge";
import {AvatarBase64, Button} from "grvd/components";
import {FaAngleDown, FaUser} from "react-icons/fa";
import {useEffect, useState} from "react";
import {IoLogOut} from "react-icons/io5";
import config from "../../../config";
import {useMerchant, useProfile, useUser} from "grvd/pages";
import {useSelector} from "react-redux";
import {RootState} from "grvd/storage";

export type TProfileItem = {
    title: string;
    icon: any;
    link: string;
}

export interface IProfileShortcutProps extends React.ComponentProps<'div'> {

}
export function ProfileShortcut(props: IProfileShortcutProps) {
    const [, setLoginWindow] = useState<Window | null>(null);
    const merchant = useMerchant();
    const user = useUser();
    const state=useSelector((state: RootState) => state.state.state);
    const handleLogin = () => {
        const win = window.open(config.server.url + '/auth/google', '_self', 'width=500,height=600,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=50%,top=50%');
        setLoginWindow(win);
    };
    const handleLogout = () => {

    };

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
                    'hover:bg-grvd-theme-sys-dark-surface-container',
                    'hover:text-grvd-theme-sys-dark-primary',
                    'focus:bg-grvd-theme-sys-dark-surface-container',
                    'focus:text-grvd-theme-sys-dark-primary',
                    'active:bg-grvd-theme-sys-dark-surface-container',
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
    }, [user]);
    if(!user) return (
        <Button colorcustom={'primary'} sizecustom={'lg'} onClick={handleLogin}>
            Login
        </Button>
    )
    return (
        <Card className={twJoin(
            'flex flex-row gap-2 items-center justify-between',
            'p-4 w-fit',
            'rounded-lg',
            'cursor-pointer',
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
                    merchant?.avatar &&
                    <AvatarBase64
                        data={merchant?.avatar?.data}
                        src={'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                        withBorder={true}
                        alt={merchant?.name}
                        variant={'circular'}
                        size={'sm'}
                        className={twJoin(
                            'h-fit outline-grvd-theme-sys-dark-tertiary outline outline-offset-[1px] aspect-[1/1]',
                        )}
                    />
                }
                <MenuHandler>
                    <button>
                        <FaAngleDown
                            size={24}
                            className={twJoin(
                                'text-grvd-theme-sys-dark-on-primary-variant',
                                'hover:text-grvd-theme-sys-dark-primary',
                                'transition-colors duration-200 ease-in-out',
                                `h-3.5 w-3.5 transition-transform ${
                                    isMenuOpen ? "rotate-180" : ""
                                }`
                            )}
                        />
                    </button>
                </MenuHandler>
                <MenuList
                    className={twJoin(
                    'bg-grvd-theme-sys-dark-surface-container backdrop-blur-lg',
                    'rounded-lg',
                    'border-none',
                    '!shadow-lg',

                    'text-grvd-theme-sys-dark-on-primary-variant',
                    'text-md',
                )}
                >
                    {profileItems.map((item, index) => renderProfileItems(item, index))}
                </MenuList>
            </Menu>
        </Card>
    );
}