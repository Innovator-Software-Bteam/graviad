import classNames from "classnames";
import {List, ListItem, Typography} from "@material-tailwind/react";

export function LeftBar() {
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
        <div className="left-bar max-w-[10vw]">
            <div>
                <Typography className={classNames(
                    'text-grvd-theme-sys-dark-on-primary-variant',
                    'text-lg',
                    'font-medium',
                    'mb-4'
                )}>Menu</Typography>
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
                <Typography className={classNames(
                    'text-grvd-theme-sys-dark-on-primary-variant',
                    'text-lg',
                    'font-medium',
                    'mb-4'
                )}>Account</Typography>
                <List>
                    <ListItem className={listItemClass}>
                        Profile
                    </ListItem>
                    <ListItem className={listItemClass}>
                        Advertisement
                    </ListItem>
                </List>
            </div>
        </div>
    );
}