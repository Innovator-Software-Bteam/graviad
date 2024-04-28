import {List, ListItem, ListItemPrefix, Navbar, Typography} from "@material-tailwind/react";
import classNames from "classnames";
import {ChevronRightIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {Input} from "@material-tailwind/react";
import {Button} from "../../atoms/Button";

export function ToolBar({
                            children,
                            className,
                            ...props
                        }) {
    const listItemRouterClass = classNames(
        'text-grvd-theme-sys-dark-on-primary-variant',
        'active:text-grvd-theme-sys-dark-primary',
        'font-medium',
        'text-md',
        'flex flex-row items-center justify-start gap-2',

        'hover:text-grvd-theme-sys-dark-primary',
        'focus:text-grvd-theme-sys-dark-primary',
        'transition-colors duration-200 ease-in-out',
    );
    return (
        <Navbar
            shadow={false}
            color={'transparent'}
            className={classNames(
                'w-full',
                'h-fit',
                'flex',
                'flex-row',
                'items-center',
                'justify-between',
            )}
        >
            <div>
                <Typography
                    variant={'lead'}
                    className={classNames(
                        'text-grvd-theme-sys-dark-primary',
                        'font-medium',
                    )}
                >
                    Dashboard
                </Typography>
                <ul
                    className={classNames(
                        'flex flex-row items-center justify-start gap-2',
                    )}
                >
                    <Typography
                        as={'li'}
                        className={listItemRouterClass}
                    >
                        Router1
                        <ChevronRightIcon className={'w-4 h-4'}/>
                    </Typography>
                    <Typography
                        as={'li'}
                        className={listItemRouterClass}
                    >
                        Router2
                        <ChevronRightIcon className={'w-4 h-4'}/>
                    </Typography>
                </ul>
            </div>
            <div className={classNames(
                'flex flex-row items-center justify-start gap-4',
                'w-fit',
            )}>
                <Input
                    type={'text'}
                    label={'Search'}
                    placeholder={'Search'}
                    labelProps={{
                        className: classNames(
                            'hidden',
                        )
                    }}
                    containerProps={{
                        className: classNames(
                            'w-fit',
                        )
                    }}
                    className={classNames(
                        'w-[30em]',
                        'rounded-md',
                        'text-grvd-theme-sys-dark-on-surface',
                        '!bg-grvd-theme-sys-dark-surface-container',
                        '!border-grvd-theme-ref-neutral-neutral-400 !border',
                        'focus:!border-grvd-theme-sys-dark-primary',
                        'placeholder:text-grvd-theme-sys-dark-primary placeholder:opacity-100',
                        'outline-none',
                    )}
                    icon={<MagnifyingGlassIcon className={'w-5 h-5'} color={'white'}/>}
                />
                <Button
                    color={'primary'}
                    size={'lg'}
                >
                    + Create Ad
                </Button>
            </div>
        </Navbar>
    );
}