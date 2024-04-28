import classNames from "classnames";
import {Avatar, Card, CardBody, CardFooter, CardHeader, List, ListItem, Typography} from "@material-tailwind/react";

export function LeftBar({
                            children,
                            className,
                            ...props
                        }) {
    const listItemClass = classNames(
        'text-grvd-theme-sys-dark-on-secondary-variant',
        'text-md',
        'font-normal',
        'rounded-md',
        'p-2',

        'hover:bg-grvd-theme-sys-dark-surface-container-high hover:text-grvd-theme-sys-dark-on-primary-variant',
        'focus:bg-grvd-theme-sys-dark-surface-container-high focus:text-grvd-theme-sys-dark-on-primary-variant',
        'active:bg-grvd-theme-sys-dark-surface-container-high active:text-grvd-theme-sys-dark-on-primary-variant',
    );
    return (
        <Card
            className={classNames(
                "left-bar w-fit h-full ",
                'justify-between',
                className
            )}
            color={'transparent'}
        >
            <CardHeader
                className={classNames(
                    'flex',
                    'flex-row',
                    'items-center',
                    'justify-start',
                    'gap-4',
                )}
                color={'transparent'}
                shadow={false}
                floated={false}
            >
                <Avatar/>
                <Typography
                    className={classNames(
                        'text-grvd-theme-sys-dark-tertiary',
                        'text-lg',
                        'font-bold',
                    )}
                    variant={'paragraph'}
                >Display Username</Typography>
            </CardHeader>
            <CardBody
                className={classNames(
                )}
            >
                <div>
                    <Typography
                        className={classNames(
                            'text-grvd-theme-sys-dark-on-primary-variant',
                            'text-lg',
                            'font-medium',
                            'mb-4'
                        )}
                        variant={'lead'}
                    >Menu</Typography>
                    <List>
                        <ListItem className={listItemClass}>
                            Home
                        </ListItem>
                        <ListItem className={listItemClass}>
                            Template
                        </ListItem>
                        <ListItem className={listItemClass}>
                            Inbox
                        </ListItem>
                    </List>
                </div>
                <div>
                    <Typography
                        className={classNames(
                            'text-grvd-theme-sys-dark-on-primary-variant',
                            'text-lg',
                            'font-medium',
                            'mb-4'
                        )}
                        variant={'lead'}
                    >Account</Typography>
                    <List>
                        <ListItem className={listItemClass}>
                            Profile
                        </ListItem>
                        <ListItem className={listItemClass}>
                            Advertisement
                        </ListItem>
                    </List>
                </div>
                <div>
                    <Typography
                        className={classNames(
                            'text-grvd-theme-sys-dark-on-primary-variant',
                            'text-lg',
                            'font-medium',
                            'mb-4'
                        )}
                        variant={'lead'}
                    >System</Typography>
                    <List>
                        <ListItem className={listItemClass}>
                            Setting
                        </ListItem>
                        <ListItem className={listItemClass}>
                            Help & Feedback
                        </ListItem>
                    </List>
                </div>
            </CardBody>
            <CardFooter>
                <Typography
                    variant={'h6'}
                    className={classNames(
                        'text-grvd-theme-sys-dark-primary',
                        'text-lg',
                        'font-bold',
                    )}
                >
                    © 2021 Graviad
                </Typography>
                <Typography
                    variant={'small'}
                    className={classNames(
                        'text-grvd-theme-sys-dark-on-primary-variant',
                        'text-sm',
                        'font-normal',
                    )}
                >
                    Version 1.0.1
                </Typography>
            </CardFooter>
        </Card>
    );
}