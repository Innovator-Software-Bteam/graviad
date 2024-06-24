import {Typography} from "@material-tailwind/react";

export function ContactPage() {
    return (
        <div
            className={'flex flex-col items-center justify-center p-32 gap-4'}
        >
            <div
                className={'flex flex-col items-center justify-center h-full'}
            >
                <Typography
                    variant={'h1'}
                    className={'text-grvd-theme-sys-dark-primary font-bold'}
                >
                    Hoang Duc Bach
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-on-primary-variant'}
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