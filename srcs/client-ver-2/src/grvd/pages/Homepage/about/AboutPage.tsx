import {Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";

export function AboutPage() {
    return (
        <div
            className={twJoin(
                'w-full flex flex-col items-start justify-center gap-8',
                'px-[25vw] py-32'
            )}
        >
            <Typography
                variant={'lead'}
                className={'text-[128px] text-grvd-theme-sys-dark-primary font-bold'}
            >
                | ABOUT
            </Typography>
            <div
                className={'w-full flex flex-col items-start justify-center gap-8 p-4'}
            >
                <Typography
                    variant={'h1'}
                    className={'text-grvd-theme-sys-dark-primary font-bold break-words'}
                >
                    The Graviad project is a personal project to help merchants more easily promote products in the
                    digital environment.
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-primary break-words'}
                >
                    With Graviad, merchants can promote products on the web with 2D and 3D images, support export
                    formats, and reduce design costs and labor.
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-primary break-words'}
                >
                    Graviad currently and will provide a collection of templates for merchants to help diversify product
                    design styles.
                </Typography>
            </div>
            <div
                className={'w-full flex flex-col items-start justify-center gap-8 p-4'}
            >
                <Typography
                    variant={'h1'}
                    className={'text-grvd-theme-sys-dark-primary font-bold break-words'}
                >
                    Still developing . . .
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-primary break-words'}
                >
                    Graviad is currently a project developed by individuals so it has not yet been completed, all
                    features are only at a basic level, and will be expanded and developed further in the future.
                </Typography>
            </div>
        </div>
    );
}