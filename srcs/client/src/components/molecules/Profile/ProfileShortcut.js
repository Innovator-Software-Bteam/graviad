import {Avatar, Card, Menu, MenuHandler, MenuItem, MenuList, Typography, Button} from "@material-tailwind/react";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {ChevronDownIcon, ArrowLeftStartOnRectangleIcon, UserIcon} from "@heroicons/react/20/solid";
import axios from "axios";
import url from "url";
import {urlServer} from "../../../config/graviad.config";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export function ProfileShortcut() {
    const user = useSelector(state => state.User);
    const [cookie, setCookie, removeCookie] = useCookies(['connect.sid']);
    const navigate = useNavigate();
    if(user.profile === null) {
        return null;
    }
    const avatarPictureSrc = user.profile.photos[0].value;
    const avatarPictureAlt = user.profile.displayName;


    const menuItemClass = classNames(
        'hover:bg-grvd-theme-sys-dark-surface-container-high',
        'hover:text-grvd-theme-sys-dark-primary',
        'focus:bg-grvd-theme-sys-dark-surface-container-high',
        'focus:text-grvd-theme-sys-dark-primary',
        'active:bg-grvd-theme-sys-dark-surface-container-high',
        'active:text-grvd-theme-sys-dark-primary',

        'flex flex-row items-center justify-start gap-2',
    );

    const logout = () => {
        axios.get(url.resolve(urlServer.toString(), '/auth/logout'), {withCredentials: true})
            .then(() => {
                removeCookie('connect.sid');
                window.location.href = '/';
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const goToProfile = () => {
        navigate('/dashboard/profile');
    }
    return (
        <Card className={classNames(
            'flex flex-row gap-4',
            'items-center',
            'justify-between',
            'px-4 py-2',
            'rounded-lg',
            'w-fit',
            'bg-grvd-theme-sys-dark-surface-container',
        )}>
            <Avatar
                withBorder={true}
                src={avatarPictureSrc}
                alt={avatarPictureAlt}
                variant={'circular'}
                size={'sm'}
                className={classNames(
                    'outline-grvd-theme-sys-dark-tertiary outline outline-offset-[1px]',
                )}
            />
            <div>
                <Typography
                    variant={'h6'}
                    className={classNames(
                        'text-grvd-theme-sys-dark-primary',
                        'font-bold',
                    )}
                >{user.profile.displayName}</Typography>
                <Typography
                    variant={'small'}
                    className={classNames(
                        'text-grvd-theme-sys-dark-on-secondary-variant',
                        'font-medium',
                    )}
                >{'Role Tags'}
                </Typography>
            </div>
            <Menu
                placement={'bottom-start'}
                offset={20}
            >
                <MenuHandler>
                    <Button
                        size={'sm'}
                        ripple={false}
                        className={classNames(
                            'bg-transparent'
                        )}
                    >
                        <ChevronDownIcon
                            width={'24'}
                            height={'24'}
                            className={classNames(
                                'text-grvd-theme-sys-dark-on-primary-variant',
                                'hover:text-grvd-theme-sys-dark-primary',
                                'transition-colors duration-200 ease-in-out',
                            )}
                        />
                    </Button>
                </MenuHandler>
                <MenuList
                    className={classNames(
                        'bg-grvd-theme-sys-dark-surface-container/90',
                        'backdrop-blur-lg',
                        'rounded-lg',
                        'border-none',
                        'shadow-none',

                        'text-grvd-theme-sys-dark-on-primary-variant',
                        'text-md',
                    )}
                >
                    <MenuItem
                        className={menuItemClass}
                        onClick={goToProfile}
                    >
                        <UserIcon width={20} height={20}/>
                        <Typography variant="small" className="font-medium">
                            Profile
                        </Typography>
                    </MenuItem>
                    <hr className="my-2 border-grvd-theme-sys-dark-outline hover:underline"/>

                    <MenuItem
                        className={menuItemClass}
                        onClick={logout}
                    >
                        <ArrowLeftStartOnRectangleIcon width={20} height={20}/>
                        <Typography variant="small" className="font-medium">
                            Log out
                        </Typography>
                    </MenuItem>
                </MenuList>
            </Menu>

        </Card>
    );
}