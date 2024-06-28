import React, {useEffect, useState} from "react";
import {Link, NavLink, Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import {CiSearch} from "react-icons/ci";
import {HiChevronRight, HiMenuAlt4} from "react-icons/hi";
import {twJoin, twMerge} from "tailwind-merge";
import {Button, Input} from "grvd/components";
import {ProfileShortcut} from "grvd/molecules";
import {
    List,
    ListItem, Menu, MenuHandler, MenuItem, MenuList,
    Navbar,
    Typography
} from "@material-tailwind/react";
import {HiOutlineHome} from "react-icons/hi2";
import {GoProjectTemplate} from "react-icons/go";
import {VscPackage} from "react-icons/vsc";
import {RiAdvertisementLine} from "react-icons/ri";
import {TbHelp, TbLayoutDashboardFilled} from "react-icons/tb";
import {ProductCreateForm} from "grvd/molecules/Product";
import {TMerchant, TProfile, TUser} from "grvd";
import axios from "axios";
import config from "./config";
import {MerchantContext, ProfileContext, UserContext} from "grvd/pages";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuthenticated} from "grvd/storage/counters/UserCounter";
import {FilterInputContext, useFilterInput} from "grvd/organisms/SearchInput/FilterInputContext";
import {useMedia} from "grvd/reponsive";
import {IoSearch} from "react-icons/io5";
import * as process from "node:process";

interface IDashboardHeaderProps extends React.ComponentProps<"header"> {
}

interface IDashboardFooterProps {
    title: string;
}

interface IDashboardMainProps extends React.ComponentProps<"main"> {
}

function DashboardHeaderTop({className}: IDashboardHeaderProps) {
    const {isTabletOrMobile, isMobile} = useMedia();
    const location = useLocation();
    const currentRoute = location.pathname.split('/');
    const dashboardTitle = currentRoute[2];
    const {setFilters} = useFilterInput();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleOnChangeSearchInput = (e: any) => {
        const value = e.target.value;
        if (setFilters) {
            setFilters(value.split(' '));
        }
    };
    const routerList = new Set<any>();
    currentRoute.map((route, index) => {
        if (index > 1) {
            routerList.add({
                title: route,
                path: location.pathname.split(route)[0] + route
            });
        }
    });
    const renderRouterListItem = (route: string, path: string, key: any) => {
        return (
            <div
                key={key}
                className={twMerge(
                    'text-grvd-theme-sys-dark-on-primary-variant',
                    'active:text-grvd-theme-sys-dark-primary',
                    'font-medium',
                    'text-md',
                    'flex flex-row items-center justify-start gap-2',

                    'hover:text-grvd-theme-sys-dark-primary',
                    'focus:text-grvd-theme-sys-dark-primary',
                    'transition-colors duration-200 ease-in-out',
                )}>
                <a href={path} className={'capitalize'}>
                    {route}
                </a>
                <HiChevronRight size={16}/>
            </div>
        );
    }
    return (
        <Navbar
            shadow={false}
            color={'transparent'}
            fullWidth={true}
            className={twJoin(
                'h-fit',
                'flex flex-row items-center justify-between',
                'gap-4',
                'md:gap-8 lg:gap-16',
                'sticky top-0 z-50',
                className
            )}
        >
            {
                isMobile
                &&
                <DashboardHeaderLeft/>
            }
            {
                !isMobile
                &&
                <div className={twMerge(
                    'flex flex-col w-fit',
                    'md:w-fit lg:w-fit'
                )}>
                    <h6
                        className={twMerge(
                            'w-full',
                            'text-grvd-theme-sys-dark-primary',
                            'font-medium text-left capitalize',
                        )}
                    >
                        {dashboardTitle}
                    </h6>
                    <div className={twMerge(
                        'flex flex-row items-center justify-start gap-2',
                    )}>
                        <NavLink
                            to={'/dashboard/home'}
                            className={({isActive}) =>
                                isActive ?
                                    twJoin(
                                        'text-grvd-theme-sys-dark-primary'
                                    )
                                    :
                                    twJoin(
                                        'text-grvd-theme-sys-dark-on-primary-variant',
                                    )

                            }
                        >
                            <TbLayoutDashboardFilled/>
                        </NavLink>
                        {Array.from(routerList).map((item, index) => renderRouterListItem(item.title, item.path, index))}
                    </div>
                </div>
            }
            <div className={twJoin(
                'w-full flex items-center justify-center',
            )}>
                <Input
                    placeholder={'Search anything ...'}
                    labelProps={{
                        className: 'hidden'
                    }}
                    containerProps={{
                        className: 'lg:!w-[50%] md:!w-[50%] w-full'
                    }}
                    icon={<IoSearch size={20} color={'white'}/>}
                    onChange={handleOnChangeSearchInput}
                />
            </div>
            {
                !isMobile &&
                <div className={'flex flex-row items-center justify-end gap-4 w-fit'}>
                    <ProductCreateForm/>
                    <ProfileShortcut/>
                </div>
            }
            {
                isMobile &&
                <ProfileShortcut/>
            }
        </Navbar>
    );
}

export interface IDashboardToolbarProps extends React.ComponentProps<'div'> {

}

export function DashboardToolbar(props: IDashboardToolbarProps) {
    return (
        <div
            className={twJoin(
                props.className
            )}
            id={'dashboard-toolbar'}
        >
            <ProductCreateForm/>
        </div>
    )
}

function DashboardHeaderLeft({className, ...props}: IDashboardHeaderProps) {
    const navigate = useNavigate();
    const {isTabletOrMobile, isMobile} = useMedia();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const listItems = [
        {
            title: 'Board',
            list: [
                {
                    title: 'Home',
                    path: 'home',
                    icon: <HiOutlineHome size={20}/>
                },
                {
                    title: 'Template',
                    path: 'templates',
                    icon: <GoProjectTemplate size={20}/>
                }
            ]
        },
        {
            title: 'Account ',
            list: [
                {
                    title: 'Products',
                    path: 'account/products',
                    icon: <VscPackage size={20}/>
                },
                {
                    title: 'Collection',
                    path: 'account/collection',
                    icon: <RiAdvertisementLine size={20}/>
                }
            ]
        },
        // {
        //     title: 'System',
        //     list: [
        //         {
        //             title: 'Settings',
        //             path: '/settings',
        //             icon: <IoSettingsOutline size={20}/>
        //         },
        //         {
        //             title: 'Help & Feedback',
        //             path: '/help-feedback',
        //             icon: <TbHelp size={20}/>,
        //         }
        //     ]
        // }
    ];
    const renderListItems = ({title, path, icon, key}: any) => {
        return (
            <div
                key={key}
                className={twJoin(
                    // 'hover:bg-grvd-theme-sys-dark-surface-container-high hover:text-grvd-theme-sys-dark-on-secondary hover:font-medium',
                    // 'focus:bg-grvd-theme-sys-dark-surface-container-high focus:text-grvd-theme-sys-dark-on-secondary focus:font-medium',
                    // 'transition-all duration-200 ease-in-out',
                    //
                    // 'text-grvd-theme-sys-dark-on-secondary-variant',
                    // 'text-md',
                    // 'font-normal',
                    // 'rounded-lg border border-transparent',
                    // 'p-2',
                )}
                onClick={() => {
                    navigate(path);
                }}
            >
                <NavLink
                    to={path}
                    className={({isActive}) =>
                        isActive ?
                            twJoin(
                                'flex flex-row items-center justify-start gap-2 w-full h-full',
                                'bg-grvd-theme-sys-dark-surface-container-high text-grvd-theme-sys-dark-primary font-medium',
                                'transition-all duration-200 ease-in-out',

                                'text-grvd-theme-sys-dark-on-secondary-variant',
                                'text-md',
                                'font-normal',
                                'rounded-lg border border-transparent',
                                'px-2 py-3',
                            )
                            :
                            twJoin(
                                'flex flex-row items-center justify-start gap-2 w-full h-full',

                                'hover:bg-grvd-theme-sys-dark-surface-container-high hover:text-grvd-theme-sys-dark-on-secondary hover:font-medium',
                                'transition-all duration-200 ease-in-out',

                                'text-grvd-theme-sys-dark-on-secondary-variant',
                                'text-md',
                                'font-normal',
                                'rounded-lg border border-transparent',
                                'px-2 py-3',
                            )

                    }
                >
                    {icon}
                    {title}
                </NavLink>
            </div>
        );
    };
    if (isMobile) {
        return (
            <Menu
                placement={'bottom-start'}
                allowHover
                offset={15}
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
                        'bg-grvd-theme-sys-dark-surface-container rounded-lg !shadow-lg',
                        'border-none',
                        'w-[50%]',
                    )}
                >
                    {listItems.map((listGroup) => {
                        return (
                            <div
                                className={'flex flex-col gap-4 w-full'}>
                                <Typography variant={'h6'}
                                            className={'font-medium text-grvd-theme-sys-dark-on-primary-variant'}>{listGroup.title}</Typography>
                                {listGroup.list.map((item, index) => renderListItems({...item, key: index}))}
                            </div>
                        )
                    })}
                </MenuList>
            </Menu>
        );
    }
    return (
        <Navbar
            shadow={false}
            className={twJoin(
                'min-h-screen w-auto',
                'px-6 py-4',
                'bg-transparent border-none',
                'sticky top-0 left-0',
                'flex flex-col justify-between',
                className,
            )}>
            <List className={'flex flex-col gap-4'}>
                {listItems.map((listGroup) => {
                    return (
                        <div
                            className={'flex flex-col gap-4'}>
                            <Typography variant={'h6'}
                                        className={'font-medium text-grvd-theme-sys-dark-on-primary-variant'}>{listGroup.title}</Typography>
                            {listGroup.list.map((item, index) => renderListItems({...item, key: index}))}
                        </div>
                    )
                })}
            </List>
            <div>
                <Typography
                    variant={'h6'}
                    className={'text-grvd-theme-sys-dark-primary font-semibold'}
                >
                    Graviad 2024
                </Typography>
                <Typography
                    variant={'small'}
                    className={'text-grvd-theme-sys-dark-on-primary-variant'}>
                    Version 2.0.0
                </Typography>
            </div>
        </Navbar>
    )

}

function DashboardFooter({...props}: IDashboardFooterProps) {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

export function DashboardMain({className, children}: IDashboardMainProps) {
    return (
        <main className={twMerge(
            'h-full w-full overflow-auto px-4 shadow-none',
            className
        )}>
            {children}
        </main>
    )
}

export function Dashboard() {
    const location = useLocation();
    const {isMobile, isTabletOrMobile} = useMedia();
    const forEmbed = new URLSearchParams(location.search).get('forEmbed') || 'false';
    const [user, setUser] = useState<TUser>();
    const [merchant, setMerchant] = useState<TMerchant>();
    const [profile, setProfile] = useState<TProfile>();
    const [id, setId] = useState<string>('');
    const dispatch = useDispatch();

    const [filters, setFilters] = useState<string[]>([]);
    const handleFilter = (key: any) => {
        return filters.length === 0 || filters.some((filter) => key.name.includes(filter));
    }
    const loadAuthenticator = async () => {
        axios.get(`${config.server.url}/auth/login`, {
            withCredentials: true,
        }).then(res => {
            setId(res.data.user.id);
        }).catch(err => {
            console.error(err);
        });
    }
    const loadUser = async () => {
        if (!id) return;
        axios.get(`${config.server.url}/users/${id}`, {
            withCredentials: true,
            params: {
                relations: ['profile', 'merchant'],
            }
        }).then(res => {
            const user = res.data;
            setUser(user);
            setProfile(user.profile.data);
            dispatch(setIsAuthenticated(true));
        }).catch(err => {
            console.error(err);
        });
    };
    const loadMerchant = async () => {
        if (!user?.merchant) return;
        if (!user?.merchant?.id) return;
        axios.get(`${config.server.url}/merchants/${user?.merchant?.id}`, {
            withCredentials: true,
            params: {
                relations: ['avatar', 'socialLinks']
            }
        }).then(res => {
            setMerchant(res.data);
        }).catch(err => {
            console.error(err);
        });
    }
    useEffect(() => {
        loadAuthenticator().then().catch();
    }, []);
    useEffect(() => {
        loadUser().then().catch();
    }, [id]);
    useEffect(() => {
        loadMerchant().then().catch();
    }, [user]);
    useEffect(() => {
        let currentPath = location.pathname.split('/')[2] || '';
        currentPath = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
        document.title = `Dashboard ${currentPath} | Graviad`;
    }, [location]);
    // console.log('server', process.env.NODE_ENV);
    return (
        <FilterInputContext.Provider value={{
            handleFilter,
            filters,
            setFilters
        }}>
            <ProfileContext.Provider value={profile as any}>
                <MerchantContext.Provider value={merchant as any}>
                    <UserContext.Provider value={user as any}>
                        <div
                            className={twMerge(
                                'h-screen max-h-screen',
                                'grid grid-rows-[min-content_auto] grid-cols-[min-content_auto]',
                                'overflow-hidden',
                                'transition-all duration-200 ease-in-out',
                            )}
                        >
                            {(forEmbed === 'false' && !isMobile) &&
                                <DashboardHeaderLeft className={'col-start-1 row-start-1 row-span-full col-span-1'}/>
                            }
                            {forEmbed === 'false' &&
                                <DashboardHeaderTop className={'col-start-2 row-start-1 col-span-2'}/>}
                            <DashboardMain className={'col-start-2 row-start-2 row-span-2 col-span-2'}>
                                <Outlet/>
                            </DashboardMain>
                            {isMobile &&
                                <DashboardToolbar className={'fixed bottom-0 left-1/2 -translate-x-1/2 mb-4'}/>
                            }
                        </div>
                    </UserContext.Provider>
                </MerchantContext.Provider>
            </ProfileContext.Provider>
        </FilterInputContext.Provider>
    );
}

