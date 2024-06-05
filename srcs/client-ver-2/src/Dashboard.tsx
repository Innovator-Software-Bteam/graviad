import React, {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {CiSearch} from "react-icons/ci";
import {HiChevronRight} from "react-icons/hi";
import {twJoin, twMerge} from "tailwind-merge";
import {Input} from "grvd/components";
import {ProfileShortcut} from "grvd/molecules";
import {
    List,
    ListItem,
    Navbar,
    Typography
} from "@material-tailwind/react";
import {HiOutlineHome} from "react-icons/hi2";
import {GoProjectTemplate} from "react-icons/go";
import {VscPackage} from "react-icons/vsc";
import {RiAdvertisementLine} from "react-icons/ri";
import {IoSettingsOutline} from "react-icons/io5";
import {TbHelp} from "react-icons/tb";
import {ProductCreateForm} from "grvd/molecules/Product";
import {TMerchant, TProfile, TUser} from "grvd";
import axios from "axios";
import config from "./config";
import {MerchantContext, ProfileContext, UserContext} from "grvd/pages";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuthenticated, setRoles} from "grvd/storage/counters/UserCounter";
import {RootState} from "grvd/storage";

interface IDashboardHeaderProps extends React.ComponentProps<"header"> {
}

interface IDashboardFooterProps {
    title: string;
}

interface IDashboardMainProps extends React.ComponentProps<"main"> {
}

function DashboardHeaderTop({className, ...props}: IDashboardHeaderProps) {
    const location = useLocation();
    const currentRoute = location.pathname.split('/');
    const dashboardTitle = currentRoute[2];
    const state= useSelector((state: RootState) => state.state.state);

    const routerList = new Set<any>();
    currentRoute.map((route, index) => {
        if (index > 1) {
            routerList.add({
                title: route,
                path: `/dashboard/${route}`
            });
        }
    });
    const renderRouterListItem = (route: string, path: string) => {
        return (
            <div className={twMerge(
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
                'flex',
                'flex-row',
                'items-center',
                'justify-between',
                'gap-16',
                'sticky top-0 z-50',
                className
            )}
        >
            <div className={twMerge(
                'flex flex-col w-full grow-[1]',
            )}>
                <h6
                    className={twMerge(
                        'text-grvd-theme-sys-dark-primary',
                        'font-medium text-left capitalize',
                    )}
                >
                    {dashboardTitle}
                </h6>
                <div className={twMerge(
                    'flex flex-row items-center justify-start gap-2',
                )}>
                    {Array.from(routerList).map((item, index) => renderRouterListItem(item.title, item.path))}
                </div>
            </div>
            <div className={'grow-[2] w-full'}>
                <Input
                    placeholder={'Search anything ...'}
                    labelProps={{
                        className: 'hidden'
                    }}
                    icon={<CiSearch size={24} color={'white'}/>}
                />
            </div>
            <div className={'flex flex-row items-center justify-end gap-4 grow-[1] w-full'}>
                <ProductCreateForm/>
                <ProfileShortcut/>
            </div>
        </Navbar>
    );
}

function DashboardHeaderLeft({className, ...props}: IDashboardHeaderProps) {
    const navigate = useNavigate();

    const listItems = [
        {
            title: 'Menu',
            list: [
                {
                    title: 'Home',
                    path: '/dashboard/home',
                    icon: <HiOutlineHome size={20}/>
                },
                {
                    title: 'Template',
                    path: '/template',
                    icon: <GoProjectTemplate size={20}/>
                }
            ]
        },
        {
            title: 'Advertisement',
            list: [
                {
                    title: 'Products',
                    path: '/products',
                    icon: <VscPackage size={20}/>
                },
                {
                    title: 'Ads',
                    path: '/ads',
                    icon: <RiAdvertisementLine size={20}/>
                }
            ]
        },
        {
            title: 'System',
            list: [
                {
                    title: 'Settings',
                    path: '/settings',
                    icon: <IoSettingsOutline size={20}/>
                },
                {
                    title: 'Help & Feedback',
                    path: '/help-feedback',
                    icon: <TbHelp size={20}/>,
                }
            ]
        }
    ];
    const renderListItems = ({title, path, icon}: any) => {
        return (
            <ListItem
                className={twJoin(
                    'hover:bg-grvd-theme-sys-dark-surface-container-high hover:text-grvd-theme-sys-dark-on-secondary hover:font-medium',
                    'focus:bg-grvd-theme-sys-dark-surface-container-high focus:text-grvd-theme-sys-dark-on-secondary focus:font-medium',
                    'transition-all duration-200 ease-in-out',

                    'text-grvd-theme-sys-dark-on-secondary-variant',
                    'text-md',
                    'font-normal',
                    'rounded-lg border border-transparent',
                    'p-2',
                )}
                onClick={() => {
                    navigate(path);
                }}
            >
                <Typography
                    as={'a'}
                    className={twJoin(
                        'flex flex-row items-center justify-start gap-2 w-full h-full',
                    )}
                >
                    {icon}
                    {title}
                </Typography>
            </ListItem>
        );
    }
    return (
        <Navbar className={twJoin(
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
                            {listGroup.list.map((item) => renderListItems(item))}
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

function DashboardFooter({props}: any) {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

export function DashboardMain({className, children}: IDashboardMainProps) {
    return (
        <main className={twMerge(
            'h-full w-full overflow-auto px-4',
            className
        )}>
            {children}
        </main>
    )
}

export function Dashboard() {
    const [user, setUser] = useState<TUser>();
    const [merchant, setMerchant] = useState<TMerchant>();
    const [profile, setProfile] = useState<TProfile>();
    const [email, setEmail] = useState<string>('');
    const dispatch = useDispatch();
    const loadAuthenticator = async () => {
        axios.get(`${config.server.url}/auth/login/success`, {
            withCredentials: true
        }).then(res => {
            setEmail(res.data.user.email);
        }).catch(err => {
            console.error(err);
        });
    }
    const loadUser = async () => {
        if (!email) return;
        axios.get(`${config.server.url}/users/email/${email}`, {
            withCredentials: true,
            params: {
                merchant: true,
                profile: true
            }
        }).then(res => {
            res.data.profile = res.data.profile.data;
            setUser(res.data);
            setProfile(res.data.profile);
            setMerchant(res.data.merchant);
            dispatch(setIsAuthenticated(true));
        }).catch(err => {
            console.error(err);
        });
    };
    // const loadMerchant = async () => {
    //     axios.get(`${config.server.url}/merchants/search`, {
    //         withCredentials: true,
    //         params: {
    //             email: profile?.emails[0].value
    //         }
    //     }).then(res => {
    //         setMerchant(res.data[0]);
    //     }).catch(err => {
    //         console.error(err);
    //     });
    // };
    useEffect(() => {
        loadAuthenticator().then().catch();
    }, []);
    useEffect(() => {
        loadUser().then().catch();
    }, [email]);
    // useEffect(() => {
    //     loadMerchant().then().catch();
    // }, [user]);
    return (
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
                        <DashboardHeaderLeft className={'col-start-1 row-start-1 row-span-full col-span-1'}/>
                        <DashboardHeaderTop className={'col-start-2 row-start-1 col-span-2'}/>
                        <DashboardMain className={'col-start-2 row-start-2 row-span-2 col-span-2'}>
                            <Outlet/>
                        </DashboardMain>
                    </div>
                </UserContext.Provider>
            </MerchantContext.Provider>
        </ProfileContext.Provider>
    );
}

