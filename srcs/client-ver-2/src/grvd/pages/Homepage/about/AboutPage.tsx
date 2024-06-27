import {Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";

export function AboutPage() {
    return (
        <div
            className={twJoin(
                'w-full flex flex-col items-start justify-center gap-8',
                'px-4 py-32',
                'sm:px-4 sm:py-16 md:px-16 md:py-24 lg:px-[25vw] lg:py-32',
            )}
        >
            <Typography
                variant={'lead'}
                className={twJoin(
                    'text-[64px] text-grvd-theme-sys-dark-primary font-bold w-full text-start',
                    'sm:text-[64px] md:text-[96px] lg:text-[128px]'
                )}
            >
                |ABOUT
            </Typography>
            <div
                className={'w-full flex flex-col items-start justify-center gap-8'}
            >
                <Typography
                    variant={'h1'}
                    className={twJoin(
                        'text-grvd-theme-sys-dark-primary font-bold break-words',
                        'sm:text-[24px] md:text-[32px] lg:text-[48px]'
                    )}
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
                className={'w-full flex flex-col items-start justify-center gap-8'}
            >
                <Typography
                    variant={'h1'}
                    className={twJoin(
                        'w-full',
                        'text-grvd-theme-sys-dark-primary font-bold break-words',
                        'sm:text-[20px] md:text-[24px] lg:text-[48px]'
                    )}
                >
                    Still developing ...
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={twJoin(
                        'w-full',
                        'text-grvd-theme-sys-dark-primary break-words',
                    )}
                >
                    Graviad is currently a project developed by individuals so it has not yet been completed, all
                    features are only at a basic level, and will be expanded and developed further in the future.
                </Typography>
            </div>
        </div>
    );
}