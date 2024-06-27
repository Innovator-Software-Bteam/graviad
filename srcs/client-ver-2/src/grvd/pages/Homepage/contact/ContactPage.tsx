import {Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";

export function ContactPage() {
    return (
        <div
            className={twJoin(
                'flex flex-col items-center justify-center px-2 py-32 gap-4',
                'sm:py-2 md:py-24 lg:py-32',
                'sm:px-2 md:px-8 lg:px-16',
            )}
        >
            <div
                className={'flex flex-col items-center justify-center h-full'}
            >
                <Typography
                    variant={'h1'}
                    className={'text-grvd-theme-sys-dark-primary font-bold text-center'}
                >
                    Hoang Duc Bach
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-on-primary-variant text-center'}
                >
                    Aspiring Developer | Designer
                </Typography>
            </div>
            <img
                src={'/assets/profile_card_of_HDB.svg'}
                alt={'profile_card_of_HDB'}
            />
        </div>
    );
}