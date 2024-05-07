import {NavLink} from "../../atoms/NavLink";
import classNames from "classnames";
import {IconBrand, IconSVG} from "../../atoms/Icon";
import {Button} from "../../atoms/Button";
import {Link} from "react-router-dom";

export function Header({children, className, ...props}) {
    return (
        <header
            className={
                classNames(
                    'sticky',
                    'z-50',
                    'w-full',
                    'mt-[30px]',
                    'top-8',
                    'mx-auto my-0',
                    className
                )}
            {...props}>
            <nav
                className={
                    classNames(
                        'header',
                        'inline-flex',
                        'items-center',
                        'justify-between',
                        'py-2.5',
                        'px-5',
                        'rounded-3xl',
                        'w-4/5',

                        'bg-grvd-theme-sys-dark-surface-container/20',
                        'backdrop-blur-[10px]',
                    )}
            >
                <ul
                    className={
                        classNames(
                            'flex',
                            'justify-between',
                            'gap-2.5',
                            'w-full',
                            'transition-[background-color] duration-[0.2s] ease-[ease]'
                        )}
                >
                    <li
                        className={
                            classNames(
                                'flex',
                                'items-center',
                                'justify-center',
                                'gap-2.5',
                            )
                        }
                    >
                        <div className={
                            classNames(
                                'flex',
                                'items-center',
                                'gap-2.5',
                            )
                        }>
                            <IconBrand size={'base'} className={'text-dashboard-theme/sys/dark/primary'}/>
                            <p
                                className={
                                    classNames(
                                        'text-grvd-theme-sys-dark-primary',
                                        'font-bold',
                                        'text-lg',
                                    )
                                }
                            >Graviad</p>
                        </div>
                    </li>
                    <li
                        className={
                            classNames(
                                'flex',
                                'items-center',
                                'justify-center',
                                'gap-2.5',
                            )
                        }
                    >
                        <ul>
                            <NavLink size={'large'} href="/">Home</NavLink>
                            <NavLink size={'large'} href="/about">About</NavLink>
                            <NavLink size={'large'} href="/contact">Contact</NavLink>
                            <NavLink size={'large'} href="/services">Services</NavLink>
                        </ul>
                    </li>
                    <li
                        className={
                            classNames(
                                'flex',
                                'items-center',
                                'justify-center',
                                'gap-2.5',
                            )
                        }
                    >
                        <ul>
                            <Link to={'login'}>
                                <Button size={'lg'} variant={'contained'}  color={'primary'}>
                                    Get Started
                                </Button>
                            </Link>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
