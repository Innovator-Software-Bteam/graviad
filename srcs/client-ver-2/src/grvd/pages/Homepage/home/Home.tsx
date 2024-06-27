import {Button, Label} from "grvd/components/index";
import {twJoin} from "tailwind-merge";
import {Avatar, Carousel, Typography} from "@material-tailwind/react";
import {TiArrowRight} from "react-icons/ti";
import {animateScroll as scroll, Events, scrollSpy} from "react-scroll";
import {useEffect} from "react";

export function HomeSectionIntro() {
    return (
        <section id={'intro'}>
            <div className={twJoin(
                'py-[10vh] h-[100vh]',
                'text-center flex flex-col items-center justify-between',
                'transition-all duration-500 ease-in-out',

                'py-[3vh]',
                'sm:py-[3vh] md:py-[6vh] lg:py-[10vh]',
            )}>
                <div className={twJoin(
                    'w-full rounded-full absolute top-0 left-0 flex items-center flex-col -z-10',
                )}>
                    <div className={twJoin(
                        'w-[50%] h-[80vh] -translate-y-1/2 rounded-full',
                        'bg-gradient-to-b from-[#0029FF] from-22.3% to-rgba(0,41,255,0.50) to-56.32% blur-[200px]'
                    )}/>
                </div>
                <div className={twJoin(
                    'w-full z-10',
                    'flex flex-col items-center gap-4',
                )}>
                    <Label border={false} color={'#ffffff'} className={'font-light'}>
                        Application Designer <span
                        className={'font-bold text-grvd-theme-sys-dark-tertiary'}>2D | 3D</span>
                    </Label>
                    <Typography
                        variant={'h1'}
                        className={twJoin(
                            'w-full',
                            'text-grvd-theme-sys-dark-primary font-bold text-center break-words',

                            'text-[32px]',
                            'sm:text-[32px] md:text-[48px] lg:text-[80px]',
                            'sm:max-w-[10em] lg:max-w-[15em]',
                        )}
                    >
                        Create poster <br/>
                        space to advertise.
                    </Typography>
                    <Typography
                        variant={'paragraph'}
                        className={twJoin(
                            'text-grvd-theme-sys-dark-on-primary-variant text-center break-words text-xl w-[20em]',
                            'sm:w-[20em] md:w-[30em] lg:w-[40em]'
                        )}
                    >
                        The web application supports creating beautiful and modern poster <br/> for <span
                        className={'font-bold'}>product</span> and <span className={'font-bold'}>profile</span>
                    </Typography>
                    <Button
                        colorcustom={'primary'}
                        sizecustom={'lg'}
                        className={'flex flex-row gap-2 items-center'}
                        onClick={() => {
                            scroll.scrollTo(window.innerHeight, {
                                duration: 500,
                                smooth: true,
                                spy: true,
                                offset: -50,
                            });
                        }}>
                        Explore
                        <TiArrowRight
                            size={24}
                            className={'animate-left-right-bounce'}
                        />
                    </Button>
                </div>
            </div>

        </section>
    );
}

export function HomeSectionUI() {
    return (
        <section id={'ui-demo'} className={'w-full flex items-center justify-center'}>
            <div
                className={twJoin(
                    'w-[95%] h-full',
                    'flex items-center justify-center',

                    'px-4 pt-8 pb-0',
                    'sm:px-4 md:px-8 lg:px-16',
                    'sm:pt-8 md:pt-16 lg:pt-20',
                    'md:w-[95%] lg:w-[95%]',
                )}
            >

                <Carousel
                    autoplay={true}
                    autoplayDelay={3000}
                    loop={true}
                    transition={{duration: 1}}
                    className={twJoin(
                        'w-full h-full rounded-lg',
                    )}
                >
                    <img
                        src={'/assets/dashboard_demo.png'}
                        alt={'dashboard_demo'}
                        className={twJoin(
                            'bottom-0 object-cover w-full'
                        )}
                    />
                    <img
                        src={'/assets/dashboard_demo_2.png'}
                        alt={'dashboard_demo'}
                        className={twJoin(
                            'bottom-0 object-cover w-full'
                        )}
                    />
                    <img
                        src={'/assets/dashboard_demo_3.png'}
                        alt={'dashboard_demo'}
                        className={twJoin(
                            'bottom-0 object-cover w-full'
                        )}
                    />
                </Carousel>
            </div>
        </section>
    );
}


export function HomeSectionProfileDemo() {
    const items = [
        {
            title: 'Export',
            description: 'View and edit your profile',
            image: '/assets/tool_export_demo.png',
        },
        {
            title: 'Template',
            description: 'Use Template for your profile card',
            image: '/assets/tool_template_demo.png',
        },
        {
            title: 'View mode',
            description: 'Swap view and edit mode',
            image: '/assets/tool_view_mode_demo.png',
        }
    ];
    const renderItem = (item: any, index: number) => {
        return (
            <div
                key={index}
                className={twJoin(
                    'w-full h-full flex flex-col items-center justify-center gap-4',
                    'rounded-[32px]',
                    'p-8',
                )}
            >
                <img
                    src={item.image}
                    alt={item.title}
                    className={twJoin(
                        'w-full h-full object-cover',
                        'rounded-[32px]',
                        'sm:w-[20em] md:w-[20em] lg:w-[20em]',
                    )}
                />
                <Typography variant={'h5'} className={'text-grvd-theme-sys-dark-primary'}>
                    {item.title}
                </Typography>
                <Typography variant={'paragraph'} className={'text-grvd-theme-sys-dark-on-primary-variant'}>
                    {item.description}
                </Typography>
            </div>
        )
    }
    return (
        <section id={'profile-demo'} className={twJoin(
            'w-full mt-[50vh]',
            'flex flex-col items-center justify-center gap-8',
            'overflow-hidden'
        )}>
            <img
                src={'/assets/profile_view_demo.png'}
                alt={'profile_demo'}
                className={twJoin(
                    'w-[50%] md:w-[30vw] lg:w-[30vw]',
                    'rounded-[32px]',
                    'object-cover'
                )}
            />
            <div className={twJoin(
                'w-full',
                'flex flex-col justify-between items-center gap-8',

                'sm:flex-col md:flex-col lg:flex-row',
                'sm:gap-16 md:gap-16 lg:gap-8',
            )}>
                {items.map((item, index) => renderItem(item, index))}
            </div>
        </section>
    )
}

export function HomeSectionProfileCardDemo() {
    return (
        <section className={twJoin(
            'w-full mt-[50vh]',
            'flex flex-row items-center justify-between gap-8 px-16',
            'overflow-hidden',
            'sm:px-8 md:px-16 lg:px-64'
        )}>
            <div
                className={twJoin(
                    'min-w-[10em] w-full h-full flex flex-col items-start justify-center gap-4',
                    'overflow-hidden'
                )}
            >
                <Typography
                    variant={'h2'}
                    className={'text-grvd-theme-sys-dark-primary font-bold w-full'}
                >
                    Profile Card
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-on-primary-variant break-words w-full'}
                >
                    Digital Business Card is a highlight of Graviad, helping customers share their information in card
                    form in many different formats.
                </Typography>
            </div>
            <img
                src={'/assets/profile_card_demo.png'}
                alt={'profile_card_demo'}
                className={twJoin(
                    'w-[50%] h-full object-cover',
                )}
            />
        </section>
    );
}

export function HomeSectionProductAdvertisementDemo() {
    return (
        <section id={'product-advertisement-demo'} className={twJoin(
            'w-full mt-[50vh] mb-[25vh]',
            'flex flex-col items-center justify-center gap-8',
            'relative',
        )}>
            <div
                className={'w-[50%] aspect-[1/1] bg-[#0732C7] -z-20 rounded-full blur-[250px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3'}/>
            <div
                className={twJoin(
                    'w-full h-full flex flex-col items-center justify-center gap-4',
                    'overflow-hidden',
                    'relative'
                )}
            >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24 4.45752C27.4007 15.9646 31.4269 20.4766 43.5424 23.9999C31.674 25.0483 27.4917 29.4883 24 43.5423C18.5019 29.4789 14.3088 24.9417 4.4576 23.9999C13.6561 21.0259 17.8958 16.611 24 4.45752Z"
                        fill="white"/>
                </svg>
                <Typography
                    variant={'h2'}
                    className={twJoin(
                        'text-grvd-theme-sys-dark-primary font-bold',

                        'text-center',
                        'sm:text-[24px] md:text-[32px] lg:text-[48px]'
                    )}
                >
                    Product Advertisement
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={twJoin(
                        'max-w-[30em] text-grvd-theme-sys-dark-on-primary-variant break-words text-center',

                        'sm:text-[16px] md:text-[18px] lg:text-[24px]'
                    )}
                >
                    Product Advertisement is a space 2D or 3D where Graviad supports pre-designed designs, reducing
                    design rental costs for merchants
                </Typography>
            </div>
            <img
                src={'/assets/product_advertisement_demo.png'}
                alt={'product_advertisement_demo'}
                className={twJoin(
                    'w-[90%]',
                    'object-cover',
                    'sm:w-[50%] md:w-[70%] lg:w-[90%]'
                )}
            />
        </section>
    )

}

export function Home() {
    return (
        <div
            className={twJoin(
                'w-full h-full',
                'flex flex-col items-center justify-start gap-8',
                'overflow-hidden',

                'sm:gap-2 md:gap-4 lg:gap-8',
            )}
        >
            <div className={'px-2 w-full h-full'}>
                <HomeSectionIntro/>
                <HomeSectionUI/>
                <HomeSectionProfileDemo/>
                <HomeSectionProfileCardDemo/>
                <HomeSectionProductAdvertisementDemo/>
            </div>
        </div>
    )

}
