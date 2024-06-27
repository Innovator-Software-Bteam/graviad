import {twJoin} from "tailwind-merge";
import {Typography} from "@material-tailwind/react";
import privacy from './graviad_privacy.json';

export function PrivacyPage() {
    return (
        <div
            className={twJoin(
                'w-full flex flex-col items-start justify-center gap-8',
                'sm:px-4 sm:py-16 md:px-16 md:py-24 lg:px-[25vw] lg:py-32',
                'px-4 py-32',
            )}
        >
            <div>
            <Typography
                variant={'lead'}
                className={twJoin(
                    'sm:text-[64px] md:text-[96px] lg:text-[128px]',
                    'text-[64px] text-grvd-theme-sys-dark-primary font-bold w-full text-start',
                )}
            >
                |{privacy.doc_name.toUpperCase()}
            </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-quaternary w-full font-semibold text-xl text-start'}
                >
                    Last updated: {privacy.last_update}
                </Typography>
            </div>
            <div
                className={'w-full flex flex-col items-start justify-center gap-8'}
            >
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-primary break-words'}
                >
                    {privacy.doc_description}
                </Typography>
                {
                    privacy.doc_content.map((content, index) => (
                        <div
                            key={index}
                            className={'w-full flex flex-col items-start justify-center gap-8'}
                        >
                            <Typography
                                variant={'h1'}
                                className={twJoin(
                                    'text-grvd-theme-sys-dark-primary font-bold break-words',
                                    'sm:text-[24px] md:text-[32px] lg:text-[48px]'
                                )}
                            >
                                {content.title}
                            </Typography>
                            {
                                <Typography
                                    key={index}
                                    variant={'paragraph'}
                                    className={'text-grvd-theme-sys-dark-primary break-words w-full'}
                                >
                                    {content.content.map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br/>
                                            <br/>
                                        </span>
                                    ))}
                                </Typography>
                            }
                        </div>
                    ))
                }
            </div>

        </div>
    )
}