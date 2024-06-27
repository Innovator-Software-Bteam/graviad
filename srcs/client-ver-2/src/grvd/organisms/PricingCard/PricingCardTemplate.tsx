import React from "react";
import {Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import {Button, ButtonWithLoading, IButtonProps, IButtonWithLoadingProps} from "grvd/components/Button";
import {twJoin, twMerge} from "tailwind-merge";
import {TPricingCard} from "./PricingCard";
import {MdOutlineDone} from "react-icons/md";
import {HiMiniXMark} from "react-icons/hi2";
import {HiOutlineCheck} from "react-icons/hi";
import axios from "axios";
import config from "../../../config";
import {TMerchant} from "grvd";
import {useNavigate} from "react-router-dom";
import {useUser} from "grvd/contexts";

export interface IPricingCardProps extends React.ComponentProps<'div'> {
    info: TPricingCard;
    containerProps?: React.ComponentProps<'div'>;
    priceProps?: React.ComponentProps<'p'>;
    levelProps?: React.ComponentProps<'p'>;
    titleProps?: React.ComponentProps<'h1'>;
    descriptionProps?: React.ComponentProps<'p'>;
    featureProps?: React.ComponentProps<'ul'>;
    featureItemProps?: React.ComponentProps<'li'>;
    triggerProps?: IButtonWithLoadingProps;
}


export function PricingCardTemplate(props: IPricingCardProps) {
    const {info} = props;
    return (
        <div
            className={twMerge(
                'max-w-[350px] w-full aspect-[3/5]',
                'rounded-lg p-8',
                'flex flex-col items-center justify-between gap-4',
                props.containerProps?.className
            )}
        >
            <div
                className={twJoin(
                    'flex flex-col items-center justify-between gap-4',
                    'h-fit w-full',
                )}
            >
                <div
                    className={twJoin(
                        'flex flex-row items-center justify-between gap-4',
                        'h-fit w-full',
                    )}
                >
                    <Typography
                        variant={'lead'}
                        className={twJoin(
                            'font-semibold',
                            props.titleProps?.className,
                        )}
                    >
                        {info.title}
                    </Typography>
                    <Typography
                        variant={'paragraph'}
                        className={twJoin(
                            props.levelProps?.className
                        )}
                    >
                        {info.level.charAt(0).toUpperCase() + info.level.slice(1)}
                    </Typography>
                </div>
                <Typography
                    variant={'lead'}
                    className={twJoin(
                        'text-4xl font-extrabold',
                        'w-full text-start',
                        props.priceProps?.className
                    )}
                >
                    {info.price.toUpperCase()}
                </Typography>
            </div>
            <div
                className={twJoin(
                    'w-full h-full',
                    'flex flex-col items-center justify-between gap-4',
                )}
            >
                <Typography
                    className={twJoin(
                        props.descriptionProps?.className
                    )}
                >
                    {info.description}
                </Typography>
                <ul
                    className={twJoin(
                        'w-full h-full',
                        'flex flex-col items-start justify-center gap-2',
                    )}
                >
                    {info.features.map((feature, index) => (
                        <li key={index}>
                            <Typography
                                variant={'paragraph'}
                                className={twJoin(
                                    'flex flex-row items-center justify-start gap-2 font-normal',
                                    props.featureItemProps?.className
                                )}
                            >
                                {feature.allow ?
                                    <span className={'text-[#0AFF22]'}><HiOutlineCheck size={24}/></span> :
                                    <span className={'text-[#FF0A0A]'}><HiMiniXMark size={24}/></span>
                                }
                                {feature.description}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className={'w-full'}
            >
                <ButtonWithLoading
                    className={twJoin(
                        'w-full',
                        props.triggerProps?.className
                    )}
                    sizecustom={'lg'}
                    colorcustom={props.triggerProps?.colorcustom}
                    onClick={props.triggerProps?.onClick}
                    isdone={props.triggerProps?.isdone}
                    iserror={props.triggerProps?.iserror}
                    isloading={props.triggerProps?.isloading}
                    label={props.triggerProps?.label as any}
                >
                    {props.triggerProps?.children}
                </ButtonWithLoading>
            </div>
        </div>
    );
}

export function PricingCardBasic() {
    const navigate = useNavigate();
    const [isloading, setIsloading] = React.useState(false);
    const [isdone, setIsdone] = React.useState(false);
    const [iserror, setIserror] = React.useState(false);
    const user = useUser();
    const info: TPricingCard = {
        price: 'Free',
        description: '',
        features: [
            {
                description: 'Free create 3 products',
                allow: true,
            },
            {
                description: 'Free use available template',
                allow: true,
            },
            {
                description: 'Export feature',
                allow: true,
            },
        ],
        level: 'basic',
        title: 'Merchant',
        triggerText: 'Start now!',
    };
    const handleCreateMerchant = () => {
        // if(!user) return;
        setIsloading(true);
        axios
            .post<any, any, TMerchant>(`${config.server.url}/merchants`, {
                name: 'Your merchant\'s name',
                phone: 'Your phone',
                description: 'Your description',
                address: 'Your address',
                email: 'Your merchant\'s email',
                socialLinks: [],
                slogan: 'Your slogan',
                userId: user?.id,
            }, {
                withCredentials: true,
            })
            .then(response => {
                setIsdone(true);
                // wait for 1s to show done animation
                setTimeout(() => {
                    setIsdone(false);
                }, 1000);
                navigate(`/dashboard/profile/${response.data.id}`,{
                    state: {
                        viewMode: 'edit',
                    }
                })
            })
            .catch(error => {
                console.error(error);
                setIserror(true);
            })
            .finally(() => {
                setIsloading(false);
            });
    }

    return (
        <PricingCardTemplate
            info={info}
            containerProps={{
                className: twJoin(
                    'bg-white',
                )
            }}
            levelProps={{
                className: twJoin(
                    'text-[#FDE50D] text-center',
                    'px-4 py-2 rounded-full',
                    'bg-grvd-theme-sys-dark-secondary',
                )
            }}
            triggerProps={{
                isdone,
                iserror,
                isloading,
                label: {
                    labelDefault: 'Start now!',
                    labelLoading: 'Creating',
                    labelDone: 'Done!',
                    labelError: 'Error!',
                },
                colorcustom: 'secondary',
                children: 'Start now!',
                onClick: handleCreateMerchant,
                className: twJoin(
                    'hover:bg-grvd-theme-sys-dark-secondary/95',
                )
            }}
        />
    )
}

export function PricingCardPremium() {
    const info: TPricingCard = {
        price: '0.99$',
        description: '',
        features: [
            {
                description: 'Unlimited products',
                allow: true,
            },
            {
                description: 'Free use available template',
                allow: true,
            },
            {
                description: 'Export feature',
                allow: true,
            },
            {
                description: 'Support 24/7',
                allow: true,
            },
        ],
        level: 'premium',
        title: 'Merchant',
        triggerText: 'Upgrade',
    }
    return (
        <PricingCardTemplate
            info={info}
            containerProps={{
                className: twJoin(
                    ' bg-grvd-theme-sys-dark-surface-container-lowest text-grvd-theme-sys-dark-on-surface',
                )
            }}
            levelProps={{
                className: twJoin(
                    'text-grvd-theme-sys-dark-quaternary text-center',
                    'px-4 py-2 rounded-full',
                    'bg-grvd-theme-sys-dark-quaternary/10',
                )
            }}
            triggerProps={{
                isdone: false,
                iserror: false,
                isloading: false,
                label: {
                    labelDefault: 'Upgrade',
                    labelLoading: 'Loading',
                    labelDone: 'Done!',
                    labelError: 'Error!',
                },
                colorcustom: 'primary',
                children: 'Upgrade',
            }}
        />
    )
}
