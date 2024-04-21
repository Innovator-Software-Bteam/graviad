import {NavLink} from "../atoms/navitems";
import classNames from "classnames";
import {IconBrand, IconSVG} from "../atoms/icons";
import {Button} from "../atoms/buttons";

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
            <div className={
                classNames(
                    'w-full h-[200px] rounded-[1440px] bg-[linear-gradient(0deg,_rgba(255,_83,_26,_0.50)_25.74%,_#FF531A_73.64%)] filter blur-[150px]',
                    'absolute top-0 left-0 right-0 -translate-y-3/4',
                )
            }>
            </div>
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

                        'bg-graviad-theme/ref/neutral/neutral-600/50',
                        'shadow-graviad-theme/shadow/shadow-large',
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
                            <IconBrand size={'base'} className={'text-graviad-theme/sys/dark/primary'}/>
                            <p
                                className={
                                    classNames(
                                        'text-graviad-theme/sys/dark/secondary',
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
                            <Button size={'base'} variant={'text'} is3DSimulated={false} color={'secondary'}>
                                <p>Log in</p>
                            </Button>
                            <Button size={'base'} variant={'contained'} color={'primary'}>
                                <p>Sign Up</p>
                            </Button>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
