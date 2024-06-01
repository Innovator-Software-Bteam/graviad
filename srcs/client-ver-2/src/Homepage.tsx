import {ComponentProps} from "react";
import {Outlet} from "react-router-dom";
import {twJoin, twMerge} from "tailwind-merge";
import {Button} from "grvd/components";
import {Link} from "react-router-dom";
import {Typography} from "@material-tailwind/react";

interface IHomepageHeaderProps extends ComponentProps<'header'> {

}

interface IHomepageFooterProps extends ComponentProps<'footer'> {
}

interface IHomepageMainProps extends ComponentProps<'main'> {
}

export function HomepageHeader({...props}: IHomepageHeaderProps) {
    const navItems = [
        {
            label: 'About',
            href: '/homepage/about',
        },
        {
            label: 'Contact',
            href: '/homepage/contact',
        },
        {
            label: 'Team',
            href: '/homepage/team',
        }
    ];
    const renderNavItems = ({label, href}: any) => {
        return (
            <div>
                <a href={href} className={twMerge(
                    'text-grvd-theme-sys-dark-on-primary-variant font-medium',
                    'hover:text-grvd-theme-sys-dark-primary',
                    'transition-colors duration-200 ease-in-out',
                )}>{label}</a>
            </div>
        )
    }

    return (
        <header className={twMerge(
            'static mt-10 z-50 w-[80vw] min-w-fit',
            'flex justify-center items-center',
            'relative',
        )}>
            <div className={twMerge(
                'w-full !left-0 flex items-center justify-between ',
            )}>
                <div className={twMerge(
                    'flex flex-col justify-between items-center',
                    'max-w-screen-lg'
                )}>
                    <Typography variant={'h4'} className={'text-grvd-theme-sys-dark-primary !font-bold'}>Graviad</Typography>
                </div>
                <div className={twMerge(
                    'absolute left-1/2 -translate-x-1/2',
                    'flex flex-row gap-4',
                    'bg-grvd-theme-sys-dark-primary/10 backdrop-blur-[10px]',
                    'py-2 px-5',
                    'rounded-lg'
                )}>
                    {navItems.map((navItem) => renderNavItems(navItem))}
                </div>
                <div
                    className={twJoin(
                    'flex flex-row gap-4 justify-end items-center',
                )}
                >
                    <Button
                        sizeCustom={'lg'}
                        colorCustom={'secondary'}
                        className={twJoin(
                            '!bg-grvd-theme-sys-dark-primary/10 !text-grvd-theme-sys-dark-primary !font-medium',
                        )}
                    >
                        Guess
                    </Button>
                    <Link to={'/homepage/login'}>
                        <Button
                            colorCustom={'primary'}
                            sizeCustom={'lg'}
                        >
                            Get started
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export function HomepageFooter({props}: any) {
    return (
        <div>
        </div>
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
        <div className={twMerge('flex flex-col items-center justify-center w-full h-full')}>
            <HomepageHeader/>
            <HomepageMain>
                <Outlet/>
            </HomepageMain>
            <HomepageFooter/>
        </div>
    );
}
