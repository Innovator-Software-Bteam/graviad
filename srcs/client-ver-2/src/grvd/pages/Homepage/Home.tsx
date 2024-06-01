import {Button, Label} from "grvd/components";
import {twJoin} from "tailwind-merge";
import {Typography} from "@material-tailwind/react";

export function Home() {
    return (
        <div className={twJoin(
            'py-[15vh]',
            'text-center flex flex-col items-center justify-center',
        )}>
            <div className={twJoin(
                'w-full rounded-full absolute top-0 left-0 flex items-center flex-col -z-10',
            )}>
                <div className={twJoin(
                    'w-[80vh] h-[80vh] -translate-y-1/2 rounded-full',
                    'bg-gradient-to-b from-[#0085FF] from-22.3% to-rgba(0,133,255,0.50) to-56.32% blur-[100px]'
                )}/>
            </div>
            <div className={twJoin(
                'w-3/4 max-w-screen-lg z-10',
                'flex flex-col items-center gap-4'
            )}>
                <Label border={false} color={'#ffffff'} className={'font-light'}>
                    Application Designer <span className={'font-bold text-grvd-theme-sys-dark-tertiary'}>2D | 3D</span>
                </Label>
                <Typography
                    variant={'h2'}
                    className={twJoin(
                        'text-grvd-theme-sys-dark-primary font-bold text-center break-words'
                    )}
                >
                    Create poster space to
                    advertise products.
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={twJoin(
                        'text-grvd-theme-sys-dark-on-primary-variant text-center'
                    )
                }
                >
                    Lorem ipsum dolor sit amet consectetur. Sed morbi turpis libero hac porttitor amet habitant.
                </Typography>
                <Button colorCustom={'primary'} sizeCustom={'lg'}>
                    Explore
                </Button>
            </div>
        </div>
    );
}
