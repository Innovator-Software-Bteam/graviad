import {Button, Label} from "grvd/components/index";
import {twJoin} from "tailwind-merge";
import {Avatar, Carousel, Typography} from "@material-tailwind/react";
import {TiArrowRight} from "react-icons/ti";
import {animateScroll as scroll, Events, scrollSpy} from "react-scroll";
import {useEffect} from "react";

export function HomeSectionUI() {
    const handleAutoScroll = ({setActiveIndex, activeIndex, length}: any) => {
        if (activeIndex === length - 1) {
            setActiveIndex(0);
        } else {
            setActiveIndex(activeIndex + 1);
        }
    };
    return (
        <section id={'ui-demo'} className={'w-full flex items-center justify-center'}>
            <div
                className={twJoin(
                    'w-[95%] h-full px-16 pt-20 pb-0 rounded-[32px]',
                    'bg-grvd-theme-sys-dark-surface-container-lowest rounded-[32px]',
                    'flex items-center justify-center',
                )}
            >

                <Carousel
                    autoplay={true}
                    autoplayDelay={3000}
                    loop={true}
                    transition={{duration: 1}}
                    className={twJoin(
                        'w-full h-full',
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

export function HomeSectionIntro() {
    return (
        <section id={'intro'}>
            <div className={twJoin(
                'py-[10vh] h-[100vh]',
                'text-center flex flex-col items-center justify-between',
                'transition-all duration-500 ease-in-out'
            )}>
                <div className={twJoin(
                    'w-full rounded-full absolute top-0 left-0 flex items-center flex-col -z-10',
                )}>
                    <div className={twJoin(
                        'w-[80vh] h-[80vh] -translate-y-1/2 rounded-full',
                        'bg-gradient-to-b from-[#0085FF] from-22.3% to-rgba(0,133,255,0.50) to-56.32% blur-[200px]'
                    )}/>
                </div>
                <div className={twJoin(
                    'max-w-screen-lg z-10',
                    'flex flex-col items-center gap-4'
                )}>
                    <Label border={false} color={'#ffffff'} className={'font-light'}>
                        Application Designer <span
                        className={'font-bold text-grvd-theme-sys-dark-tertiary'}>2D | 3D</span>
                    </Label>
                    <Typography
                        variant={'h1'}
                        className={twJoin(
                            'text-grvd-theme-sys-dark-primary font-bold text-center break-words text-[80px]'
                        )}
                    >
                        Create poster space to
                        advertise products.
                    </Typography>
                    <Typography
                        variant={'paragraph'}
                        className={twJoin(
                            'text-grvd-theme-sys-dark-on-primary-variant text-center break-words w-[6   0%]'
                        )
                        }
                    >
                        The web application supports creating beautiful and modern advertising posters in many formats
                        for merchant
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
    )
}

export function HomeSectionProfileDemo() {
    const items = [
        {
            title: 'Profile',
            description: 'View and edit your profile',
            image: '/assets/tool_export_demo.png',
        },
        {
            title: 'Profile',
            description: 'View and edit your profile',
            image: '/assets/tool_template_demo.png',
        },
        {
            title: 'Profile',
            description: 'View and edit your profile',
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
                    'p-8'
                )}
            >
                <img
                    src={item.image}
                    alt={item.title}
                    className={twJoin(
                        'w-full h-full object-cover',
                        'rounded-[32px]'
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
                    'w-[30vw]',
                    'rounded-[32px]'
                )}
            />
            <div className={twJoin(
                'w-full',
                'flex flex-row justify-between items-center gap-8',
            )}>
                {items.map((item, index) => renderItem(item, index))}
            </div>
        </section>
    )
}

export function HomeSectionProfileCardDemo() {
    return (
        <section className={twJoin(
            'w-full mt-[50vh] px-64',
            'flex flex-row items-center justify-between gap-8',
            'overflow-hidden'
        )}>
            <div
                className={twJoin(
                    'w-[20em] h-full flex flex-col items-start justify-center gap-4',
                    'overflow-hidden'
                )}
            >
                <Typography
                    variant={'h2'}
                    className={'text-grvd-theme-sys-dark-primary font-bold'}
                >
                    Profile Card
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-on-primary-variant break-words'}
                >
                    Digital Business Card is a highlight of Graviad, helping customers share their information in card
                    form in many different formats.
                </Typography>
            </div>
            <img
                src={'/assets/profile_card_demo.png'}
                alt={'profile_card_demo'}
                className={twJoin(
                    'w-[30vw]',
                )}
            />
        </section>
    );
}

export function HomeSectionProductAdvertisementDemo() {
    return (
        <section id={'product-advertisement-demo'} className={twJoin(
            'w-full mt-[50vh]',
            'flex flex-col items-center justify-center gap-8',
            'relative'
        )}>
            <div className={'w-[50%] aspect-[1/1] bg-[#0732C7] -z-20 rounded-full blur-[250px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3'}/>
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
                    className={'text-grvd-theme-sys-dark-primary font-bold'}
                >
                    Product Advertisement
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'max-w-[30em] text-grvd-theme-sys-dark-on-primary-variant break-words text-center'}
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
                'overflow-hidden'
            )}
        >
        <HomeSectionIntro/>
            <HomeSectionUI/>
            <HomeSectionProfileDemo/>
            <HomeSectionProfileCardDemo/>
            <HomeSectionProductAdvertisementDemo/>
        </div>
    )

}
