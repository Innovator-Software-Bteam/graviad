import {ComponentProps} from "react";
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {twJoin, twMerge} from "tailwind-merge";
import {Button} from "grvd/components";
import {Link} from "react-router-dom";
import {Typography} from "@material-tailwind/react";
import {FaFacebookF} from "react-icons/fa";
import {MdOutlineEmail} from "react-icons/md";
import {FaLinkedinIn} from "react-icons/fa6";
import {IconBrand} from "grvd/components/Icon/IconBrand";

interface IHomepageHeaderProps extends ComponentProps<'header'> {

}


interface IHomepageMainProps extends ComponentProps<'main'> {
}

export function HomepageHeader({...props}: IHomepageHeaderProps) {
    const navigate = useNavigate();
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
    }
    const handleGuessButton = () => {
        navigate('/dashboard', {
            state: {
                role: 'guest'
            }
        })
    }
    return (
        <header className={twMerge(
            'mt-10 z-50 w-full min-w-fit py-4 px-[5%]',
            'flex justify-center items-center',
            'sticky top-0 z-50',
            'backdrop-blur-[50px]',
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
                <div className={twMerge(
                    'absolute left-1/2 -translate-x-1/2',
                    'flex flex-row gap-4',
                    'bg-grvd-theme-sys-dark-primary/10 backdrop-blur-[10px]',
                    'py-2 px-5',
                    'rounded-lg'
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
                'top-[100vh] w-full h-[400px] z-50 mt-[500px]',
                'px-16 py-4',
                'flex justify-between items-center',
                // 'bg-grvd-theme-sys-dark-surface-container-lowest',
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
                        className={'text-grvd-theme-sys-dark-primary font-bold'}
                    >
                        Explore Graviad now !
                    </Typography>
                    <Typography variant={'paragraph'} className={'break-words max-w-[30em]'}>
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
            'h-full'
        )} {...props}>
            {children}
        </main>
    );
}

export function Homepage() {
    return (
        <div
            className={twMerge('flex flex-col items-center justify-center w-full h-full min-h-screen')}>
            <HomepageHeader/>
            <HomepageMain>
                <Outlet/>
            </HomepageMain>
            <HomepageFooter/>
        </div>
    );
}
