import React, {ComponentProps, useEffect} from "react";
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {twJoin, twMerge} from "tailwind-merge";
import {Button} from "grvd/components";
import {Link} from "react-router-dom";
import {Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {FaFacebookF} from "react-icons/fa";
import {MdOutlineEmail} from "react-icons/md";
import {FaLinkedinIn} from "react-icons/fa6";
import {IconBrand} from "grvd/components/Icon/IconBrand";
import {useMedia} from "grvd/reponsive";
import {HiMenuAlt4} from "react-icons/hi";
import axios from "axios";
import config from "./config";
import {setIsAuthenticated} from "grvd/storage/counters/UserCounter";
import {TUser} from "grvd";
import {useDispatch} from "react-redux";
import {UserContext} from "grvd/contexts";

interface IHomepageHeaderProps extends ComponentProps<'header'> {

}


interface IHomepageMainProps extends ComponentProps<'main'> {
}

export function HomepageHeader({...props}: IHomepageHeaderProps) {
    const navigate = useNavigate();
    const {isTabletOrMobile} = useMedia();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navItems = [
        {
            label: 'Home',
            href: '/homepage/home',
        },
        {
            label: 'About',
            href: '/homepage/about',
        },
        {
            label: 'Contact',
            href: '/homepage/contact',
        },
        {
            label: 'Pricing',
            href: '/homepage/pricing',
        },
        {
            label: 'Privacy',
            href: '/homepage/privacy',
        }
    ];
    const renderNavItems = ({label, href, index}: any) => {
        return (
            <div key={index}>
                <NavLink to={href} className={
                    ({isActive, isPending}) => [
                        isActive ? 'text-grvd-theme-sys-dark-primary' : 'text-grvd-theme-sys-dark-on-primary-variant',
                        twMerge(
                            'text-grvd-theme-sys-dark-on-primary-variant font-medium',
                            'hover:text-grvd-theme-sys-dark-primary',
                            'transition-colors duration-200 ease-in-out',
                        ),
                    ].join(" ")
                }>{label}</NavLink>
            </div>
        );
    };
    const renderNavItemsMobile = ({children}: any) => {
        return (
            <MenuItem
                className={twJoin(
                    'bg-transparent',
                    'hover:bg-transparent focus:bg-transparent active:bg-transparent',
                )}
            >
                {children}
            </MenuItem>
        )
    };
    const handleGuessButton = () => {
        navigate('/dashboard', {
            state: {
                role: 'guest'
            }
        })
    }
    return (
        <header className={twMerge(
            'z-50 w-full min-w-fit py-4 px-[5%]',
            'flex justify-center items-center',
            'sticky top-0 z-50',
            'backdrop-blur-[100px]',
            'w-full',

            'mt-0',
            'md:mt-10 lg:mt-10 xl:mt-10',
        )}>
            <div className={twMerge(
                'w-full !left-0 flex items-center justify-between ',
            )}>
                <div className={twMerge(
                    'flex flex-row justify-between items-center gap-2',
                    'max-w-screen-lg',
                    'cursor-pointer',
                )}
                     onClick={() => {
                         navigate('/homepage/home')
                     }}
                >
                    <IconBrand size={64}/>
                    <Typography variant={'h4'}
                                className={'text-grvd-theme-sys-dark-primary !font-bold'}>Graviad</Typography>
                </div>
                {
                    !isTabletOrMobile &&
                    <>
                        <div className={twMerge(
                            'absolute left-1/2 -translate-x-1/2',
                            'flex flex-row gap-4',
                            'bg-grvd-theme-sys-dark-primary/10 backdrop-blur-[10px]',
                            'py-2 px-5',
                            'rounded-full'
                        )}>
                            {navItems.map((navItem, index) => renderNavItems({
                                label: navItem.label,
                                href: navItem.href,
                                index: index
                            }))}
                        </div>
                        <div
                            className={twJoin(
                                'flex flex-row gap-4 justify-end items-center',
                            )}
                        >
                            <Button
                                sizecustom={'lg'}
                                colorcustom={'secondary'}
                                className={twJoin(
                                    '!bg-grvd-theme-sys-dark-primary/10 !text-grvd-theme-sys-dark-primary !font-medium',
                                )}
                                onClick={handleGuessButton}
                            >
                                Guess
                            </Button>
                            <Link to={'/homepage/login'}>
                                <Button
                                    colorcustom={'primary'}
                                    sizecustom={'lg'}
                                >
                                    Get started
                                </Button>
                            </Link>
                        </div>
                    </>
                }
                {
                    isTabletOrMobile &&
                    <div>
                        <Menu
                            placement={'bottom'}
                            allowHover
                            offset={75}
                            handler={setIsMenuOpen}
                            open={isMenuOpen}
                        >
                            <MenuHandler>
                                <button>
                                    <HiMenuAlt4 size={24} color={'white'}/>
                                </button>
                            </MenuHandler>
                            <MenuList
                                className={twJoin(
                                    'flex flex-col gap-2 items-center justify-center',
                                    'bg-grvd-theme-sys-dark-primary/10 backdrop-blur-[100px] rounded-lg',
                                    'border-none',
                                    'w-[75%]',
                                    '!left-1/2 !-translate-x-1/2',
                                )}
                            >
                                {navItems.map((navItem, index) =>
                                    <MenuItem
                                        className={twJoin(
                                            'bg-transparent',
                                            'hover:bg-transparent focus:bg-transparent active:bg-transparent',
                                            'relative'
                                        )}
                                        key={index}
                                    >
                                        <NavLink
                                            to={navItem.href}
                                            id={navItem.label}
                                            className={
                                                twMerge(
                                                    'text-grvd-theme-sys-dark-primary font-medium text-base',
                                                    'block w-full h-full',
                                                )
                                            }>
                                            {navItem.label}
                                        </NavLink>
                                    </MenuItem>
                                )}
                                <div className={'w-full bg-grvd-theme-sys-dark-primary/10 h-[0.5px] rounded-full'}/>
                                {renderNavItemsMobile({
                                    children:
                                        <Button
                                            sizecustom={'lg'}
                                            colorcustom={'secondary'}
                                            className={twJoin(
                                                '!bg-grvd-theme-sys-dark-primary/10 !text-grvd-theme-sys-dark-primary !font-medium w-full',
                                            )}
                                            onClick={handleGuessButton}
                                        >
                                            Guess
                                        </Button>
                                })}
                                {renderNavItemsMobile({
                                    children:
                                        <Button
                                            colorcustom={'primary'}
                                            sizecustom={'lg'}
                                            className={'w-full'}
                                        >
                                            <Link to={'/homepage/login'} className={'w-full h-full'}>
                                                Get started
                                            </Link>
                                        </Button>
                                })}
                            </MenuList>
                        </Menu>
                    </div>
                }
            </div>
        </header>
    );
}

export interface IHomepageFooterProps extends ComponentProps<'footer'> {

}

export type TContactItem = {
    label: string;
    href: string;
    icon?: any;
}

export function HomepageFooter(props: IHomepageFooterProps) {
    const contactItems: TContactItem[] = [
        {
            label: 'Facebook',
            href: 'https://www.facebook.com/bach.ok.33/',
            icon: <FaFacebookF/>
        },
        {
            label: 'Gmail',
            href: 'mailto:hoangbach0985@gmail.com',
            icon: <MdOutlineEmail/>
        },
        {
            label: 'Twitter',
            href: 'https://www.linkedin.com/in/hoang-duc-bach-261a6a270/',
            icon: <FaLinkedinIn/>
        }
    ];
    const renderContactItems = ({label, href, icon}: TContactItem, index: number) => {
        return (
            <Link to={href} target={'_blank'} key={index} className={'text-white'}>
                <div className={twJoin(
                    'bg-white/10 rounded-full flex justify-center items-center',
                    'p-2',
                    'hover:scale-125 transition-transform duration-200 ease-in-out',
                )}>
                    {icon}
                </div>
            </Link>
        )
    };
    return (
        <footer
            className={twMerge(
                'top-[100vh] w-full min-h-fit z-50',
                'px-8 py-8',
                'sm:px-8 sm:py-4 md:px-16 md:py-8 lg:px-16 lg:py-16',
                'flex flex-col justify-between items-center',
                'text-grvd-theme-sys-dark-on-primary-variant'
            )}
        >
            <div className={'w-full h-full flex flex-col justify-between'}>
                <div
                    className={twMerge(
                        'flex flex-col items-center justify-center py-4 gap-8',
                    )}
                >
                    <Typography
                        variant={'h1'}
                        className={twJoin(
                            'text-grvd-theme-sys-dark-primary font-bold text-center',
                            'flex flex-col items-center justify-center gap-4',
                            'sm:text-[24px] md:text-[32px] lg:text-[48px]'
                        )}
                    >
                        <IconBrand size={128}/>
                        Explore Graviad<br/>
                        now !
                    </Typography>
                    <Typography variant={'paragraph'} className={'break-words max-w-[30em] text-center'}>
                        Follow me, don't hesitate to give me your comments !
                    </Typography>
                </div>
                <div className={twJoin(
                    'flex flex-row gap-4 justify-between items-center',
                    'w-full'
                )}>
                    <Typography
                        variant={'small'}
                        className={'text-grvd-theme-sys-dark-on-primary-variant font-normal'}
                    >© 2024 Graviad. All right reserved
                    </Typography>
                    <div className={'flex flex-row items-center justify-center gap-4'}>
                        {contactItems.map((contactItem, index) => renderContactItems(contactItem, index))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

/**
 * @description Frame of main of Homepage, contains the main content
 */
export function HomepageMain({children, ...props}: any) {
    return (
        <main className={twJoin(
            'h-full w-full'
        )} {...props}>
            {children}
        </main>
    );
}

export function Homepage() {
    const location = useLocation();
    const [email, setEmail] = React.useState('');
    const [user, setUser] = React.useState<TUser>();
    const loadAuthenticator = async () => {
        axios.get(`${config.server.url}/auth/login`, {
            withCredentials: true
        }).then(res => {
            setEmail(res.data.user.email);
        }).catch(err => {
            console.error(err);
        });
    };
    const loadUser = async () => {
        if (!email) return;
        axios.get(`${config.server.url}/users/search`, {
            withCredentials: true,
            params: {
                relations: ['profile', 'merchant'],
                where: {
                    email: email
                },
            }
        }).then(res => {
            const user = res.data;
            setUser(user);
        }).catch(err => {
            console.error(err);
        });
    };

    useEffect(() => {
        loadAuthenticator().then().catch();
    }, []);
    useEffect(() => {
        loadUser().then().catch();
    }, [email]);
    useEffect(() => {
        let currentPath = location.pathname.split('/').pop() || '';
        currentPath = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
        document.title = `${currentPath} | Graviad`;
    }, [location]);
    return (
        <UserContext.Provider value={user}>
            <div
                className={twMerge('flex flex-col items-center justify-start w-full h-full min-h-screen')}>
                <HomepageHeader/>
                <HomepageMain>
                    <Outlet/>
                </HomepageMain>
                <HomepageFooter/>
            </div>
        </UserContext.Provider>
    );
}
