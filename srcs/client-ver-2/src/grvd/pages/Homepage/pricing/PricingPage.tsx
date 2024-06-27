import {IPageProps} from "grvd/pages/types";
import {PricingCard} from "grvd/organisms";
import {twJoin} from "tailwind-merge";
import {Typography} from "@material-tailwind/react";

export interface IProfileOwnerBarProps extends IPageProps {
}

export function SectionIntro() {
    return (
        <section
            className={twJoin(
                'flex flex-col items-center justify-center gap-8',
                'w-full',
                'px-2'
            )}
        >
            <Typography
                variant={'lead'}
                className={twJoin(
                    'text-grvd-theme-sys-dark-primary font-medium',
                    'px-8 py-2 rounded-full w-fit',
                    'border-grvd-theme-sys-dark-primary border-2',
                )}
            >
                Choose plan
            </Typography>
            <Typography
                variant={'h1'}
                className={twJoin(
                    'text-grvd-theme-sys-dark-primary font-bold text-center break-words',
                    'w-full',
                )}
            >
                Upgrade to get more features
            </Typography>
            <Typography
                variant={'paragraph'}
                className={twJoin(
                    'text-grvd-theme-sys-dark-on-secondary-variant text-center break-words',

                    'w-[75%]',
                    'sm:w-[75%]',
                    'md:w-[75%]',
                    'lg:w-[75%]',
                )}
            >
                There is currently a free package, higher packages are still in beta version, we will deploy in the near
                future
            </Typography>
        </section>
    );
}
export function SectionPrice() {
    return(
        <section
            className={twJoin(
                'w-full',

                'flex flex-col items-center justify-center gap-8',
                'sm:flex-col sm:gap-8 sm:items-center sm:justify-center',
                'md:flex-col md:gap-8 md:items-center md:justify-center',
                'lg:flex-row lg:gap-8 lg:items-center lg:justify-center',
            )}
        >
            <PricingCard type={'basic'}/>
            <PricingCard type={'premium'}/>
        </section>
    )
}
export function PricingPage(props: IProfileOwnerBarProps) {
    return (
        <div
            className={twJoin(
                'h-full min-h-screen w-full mt-8',
                'flex flex-col items-center justify-start gap-8'
            )}
        >
            <SectionIntro/>
            <SectionPrice/>
        </div>
    );
}