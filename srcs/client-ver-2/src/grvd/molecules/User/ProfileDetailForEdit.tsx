import {twJoin} from "tailwind-merge";
import {Avatar, Typography} from "@material-tailwind/react";
import {FaExternalLinkAlt} from "react-icons/fa";
import classNames from "classnames";
import {useForm, UseFormRegisterReturn} from 'react-hook-form';
import {useEffect, useState} from "react";
import {FaCircleExclamation} from "react-icons/fa6";
import {AiOutlineLike} from "react-icons/ai";
import {BiPackage} from "react-icons/bi";
import axios from "axios";
import config from "../../../config";
import {Button, InputWithTitle, Label} from "grvd/components";
import {useMerchant, useProfile, useUser} from "grvd/pages/Dashboard";
import {IPageProps} from "grvd/pages/types";
import {PiExportBold} from "react-icons/pi";
export type TInput = {
    title: string;
    name?: string;
    register: UseFormRegisterReturn<any>;
}
export type TFormInput = {
    email: string;
    phone: string;
    address: string;
    description: string;
    slogan: string;
    facebookLink: string;
    twitterLink: string;
    instagramLink: string;
}
export type TSocialLink = {
    provider: string;
    data: string;
}

export function ProfileAvatarArea() {
    const profile = useProfile();
    const merchant = useMerchant();
    const user = useUser();

    const [numberOfLikes, setNumberOfLikes] = useState(merchant?.numberOfLikes);
    const [numberOfProducts, setNumberOfProducts] = useState(merchant?.numberOfProducts);

    useEffect(() => {
        setNumberOfLikes(merchant?.numberOfLikes);
        setNumberOfProducts(merchant?.numberOfProducts);
    }, [user, merchant]);
    return (
        <div className={twJoin(
            'flex flex-row gap-4',
            'h-full w-fit',
            'items-center justify-start',
        )}>
            {
                profile?.photos &&
                <Avatar
                    withBorder={true}
                    src={profile.photos[0].value || undefined}
                    alt={profile.displayName}
                    variant={'rounded'}
                    size={'sm'}
                    className={twJoin(
                        'mx-auto rounded-[30px]',
                        'h-[200px] aspect-[1/1] w-fit'
                    )}
                />
            }
            <div>
                <div className={classNames(
                    'flex flex-col',
                    'w-full h-full',
                    'gap-4'
                )}>
                    <Typography
                        variant={'h1'}
                        className={classNames(
                            'text-grvd-theme-sys-dark-primary',
                            'font-bold',
                            'w-fit',
                            'whitespace-nowrap'
                        )}
                    >
                        {user?.profile?.displayName}
                    </Typography>
                    <Typography
                        className={'w-fit bg-white/5 px-5 py-1 rounded-md text-white font-medium'}
                    >
                        Merchant
                    </Typography>
                    <Typography
                        as={'a'}
                        variant={'small'}
                        className={classNames(
                            'text-grvd-theme-sys-dark-on-primary-variant',
                            'font-medium',
                            'flex flex-row gap-2 items-center justify-start',
                            'hover:text-grvd-theme-sys-dark-primary/80',
                            'transition-colors duration-200 ease-in-out',
                        )}
                        href={'https://trenalys.io.vn'}
                        target={'_blank'}
                    >
                        {merchant?.socialLinks?.find((socialLink: {
                            provider: string,
                            link: string
                        }) => socialLink.provider === 'website')?.link}
                        <FaExternalLinkAlt className={'inline-block'} size={'16'}/>
                    </Typography>
                    <div className={'flex flex-row gap-4'}>
                        <Typography
                            variant={'small'}
                            className={twJoin(
                                'flex flex-row gap-2 items-center',
                                'text-grvd-theme-sys-dark-primary font-medium'
                            )}>
                            <AiOutlineLike size={20}/>
                            {numberOfLikes}
                        </Typography>
                        <Typography
                            variant={'small'}
                            className={twJoin(
                                'flex flex-row gap-2 items-center',
                                'text-grvd-theme-sys-dark-primary font-medium'
                            )}>
                            <BiPackage size={20}/>
                            {numberOfProducts}
                        </Typography>
                    </div>
                </div>
            </div>
            <Button
                colorCustom={'secondary'}
                sizeCustom={'lg'}
                className={'bg-[rgb(157,157,157)]/25 flex flex-row gap-2 items-center justify-center w-fit h-fit backdrop-blur-[25px] relative'}
            >
                Export Profile
                <PiExportBold size={20}/>
                <div className={twJoin(
                    'absolute top-0 left-0 right-0 bottom-0 w-full h-full',
                    'bg-[rgb(176,13,253)]/25 blur-[25px] -z-20'
                )}/>
            </Button>
        </div>
    );
}


export function ProfileFormArea() {
    const merchant = useMerchant();

    const [email, setEmail] = useState(merchant?.email);
    const [phone, setPhone] = useState(merchant?.phone);
    const [address, setAddress] = useState(merchant?.address);
    const [description, setDescription] = useState(merchant?.description);
    const [slogan, setSlogan] = useState(merchant?.slogan);
    const [socialLinks, setSocialLinks] = useState(merchant?.socialLinks);
    const [facebookLink, setFacebookLink] = useState(merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'facebook')?.link);
    const [twitterLink, setTwitterLink] = useState(merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'twitter')?.link);
    const [instagramLink, setInstagramLink] = useState(merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'instagram')?.link);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<TFormInput>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            email,
            phone,
            address,
            description,
            slogan,
            facebookLink,
            twitterLink,
            instagramLink,

        },
        criteriaMode: 'firstError',
    });
    const onSubmit = async (data: any) => {
        console.log('data', data)
        const socialLinks: TSocialLink[] = [
            {
                provider: 'facebook',
                data: data.facebookLink
            },
            {
                provider: 'twitter',
                data: data.twitterLink
            },
            {
                provider: 'instagram',
                data: data.instagramLink
            }
        ];
        await axios
            .put(`${config.server.url}/merchants/${merchant?.id}`, {
                email: data.email,
                phone: data.phone,
                address: data.address,
                description: data.description,
                slogan: data.slogan,
                socialLinks: socialLinks,
            }, {
                withCredentials: true,
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    };
    const inputItems: Record<string, TInput> = {
        description: {
            title: 'Description',
            register: register('description', {
                required: 'Description is required',
                onChange: (e) => setDescription(e.target.value),
            })
        },
        slogan: {
            title: 'Slogan',
            register: register('slogan', {
                maxLength: {value: 100, message: 'Slogan should have a maximum of 100 characters'},
                onChange: (e) => setSlogan(e.target.value),
            }),
        },
        email: {
            title: 'Email',
            register: register('email', {
                required: 'Email is required',
                onChange: (e) => setEmail(e.target.value),
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address'
                }

            })
        },
        phone: {
            title: 'Phone',
            register: register('phone', {
                required: 'Phone is required',
                onChange: (e) => setPhone(e.target.value),

            })
        },
        address: {
            title: 'Address',
            register: register('address', {
                onChange: (e) => setAddress(e.target.value),
            })
        },
        facebookLink: {
            title: 'Facebook',
            register: register('facebookLink', {
                onChange: (e) => setFacebookLink(e.target.value),
            })

        },
        twitterLink: {
            title: 'Twitter',
            name: 'twitterLink',
            register: register('twitterLink', {})
        },
        instagramLink: {
            title: 'Instagram',
            register: register('instagramLink', {})
        },
    }
    useEffect(() => {
        setEmail(merchant?.email);
        setPhone(merchant?.phone);
        setAddress(merchant?.address);
        setDescription(merchant?.description);
        setSlogan(merchant?.slogan);
        setSocialLinks(merchant?.socialLinks);
        setFacebookLink(merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'facebook')?.data);
        setTwitterLink(merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'twitter')?.data);
        setInstagramLink(merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'instagram')?.data);
    }, [merchant]);
    useEffect(() => {
        reset({
            address,
            email,
            phone,
            description,
            slogan,
            facebookLink,
            twitterLink,
            instagramLink,
        })
    }, [merchant]);
    return (
        <form
            className={classNames(
                'flex flex-col flex-wrap gap-4',
            )}
            onSubmit={handleSubmit(onSubmit)}
        >
            <InputWithTitle
                title={inputItems.description.title}
                {...inputItems.description.register}
            />
            <div>
                <InputWithTitle
                    title={inputItems.slogan.title}
                    {...inputItems.slogan.register}
                />
                <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center gap-2 font-normal"
                >
                    <FaCircleExclamation size={16}/>
                    Slogan should have a maximum of 100 characters
                </Typography>
            </div>
            <div className={'flex flex-row gap-4 justify-between w-full'}>
                <InputWithTitle
                    title={inputItems.email.title}
                    {...inputItems.email.register}
                />
                <InputWithTitle
                    title={inputItems.phone.title}
                    {...inputItems.phone.register}
                />
            </div>
            <InputWithTitle
                title={inputItems.address.title}
                {...inputItems.address.register}
            />
            <div className={'flex flex-col gap-4 w-full h-full'}>
                <InputWithTitle
                    title={inputItems.facebookLink.title}
                    {...inputItems.facebookLink.register}
                />
                <InputWithTitle
                    title={inputItems.twitterLink.title}
                    {...inputItems.twitterLink.register}
                />
                <InputWithTitle
                    title={inputItems.instagramLink.title}
                    {...inputItems.instagramLink.register}
                />
            </div>
            <Button type={'submit'} sizeCustom={'lg'} colorCustom={'primary'} className={'w-fit'}>Save</Button>
        </form>
    );
}

export function ProfileDetailForEdit({className, ...props}: IPageProps) {
    return (
        <div>
            <div className={twJoin(
                'flex flex-row justify-between'
            )}>
                <div className={twJoin(
                    'w-full h-fit flex flex-col gap-4',
                )}>
                    <ProfileAvatarArea/>
                    <ProfileFormArea/>
                </div>
            </div>
        </div>
    );

}