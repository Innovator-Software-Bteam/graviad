import {ComponentProps} from "react";
import {Outlet, useNavigate} from "react-router-dom";
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
    const navigate = useNavigate();
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
    const renderNavItems = ({label, href, index}: any) => {
        return (
            <div key={index}>
                <a href={href} className={twMerge(
                    'text-grvd-theme-sys-dark-on-primary-variant font-medium',
                    'hover:text-grvd-theme-sys-dark-primary',
                    'transition-colors duration-200 ease-in-out',
                )}>{label}</a>
            </div>
        )
    }
    const handleGuessButton = () => {
        navigate('/dashboard',{
            state: {
                role: 'guest'
            }
        })
    }
    return (
        <header className={twMerge(
            'mt-10 z-50 w-[80vw] min-w-fit py-4',
            'flex justify-center items-center',
            'sticky top-0 z-50',
            'backdrop-blur-[50px]',
        )}>
            <div className={twMerge(
                'w-full !left-0 flex items-center justify-between ',
            )}>
                <div className={twMerge(
                    'flex flex-col justify-between items-center',
                    'max-w-screen-lg'
                )}>
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
