import {twJoin} from "tailwind-merge";
import {Card, Typography} from "@material-tailwind/react";
import {FaExternalLinkAlt} from "react-icons/fa";
import classNames from "classnames";
import {useForm} from 'react-hook-form';
import React, {useEffect, useRef, useState} from "react";
import {FaCircleExclamation} from "react-icons/fa6";
import {AiOutlineLike} from "react-icons/ai";
import {BiPackage} from "react-icons/bi";
import axios from "axios";
import config from "../../../config";
import {
    AvatarBase64,
    ButtonWithLoading,
    IButtonWithLoadingProps,
    InputWithTitle,
    TextareaWithTitle
} from "grvd/components";
import {MerchantContext, useMerchant, useToolbar, useUser} from "grvd/pages";
import {TInput} from "grvd/molecules"
import {IPageProps} from "grvd/pages/types";
import {ProfileCard} from "grvd/molecules/User";
import {TAvatar2D, TMerchant, TSocialLink} from "grvd";
import {IoIosAdd} from "react-icons/io";
import {encode} from "base64-arraybuffer";
import {Navigate} from "react-router-dom";

type TProfileFormContext = {
    profileForm: TMerchant | null;
    setProfileForm: React.Dispatch<React.SetStateAction<TMerchant | null>>;
}
const ProfileFormContext = React.createContext<TProfileFormContext>({
    profileForm: null,
    setProfileForm: () => {
    }
});
const useProfileForm = () => React.useContext(ProfileFormContext);
export type TFormInput = {
    email: string;
    phone: string;
    address: string;
    description: string;
    slogan: string;
    facebookLink: string;
    twitterLink: string;
    instagramLink: string;
    avatar: TAvatar2D;
}

export interface IProfileAvatarAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    onAvatarChange: (file: File) => void;
}

export function ProfileAvatarArea({onAvatarChange}: IProfileAvatarAreaProps) {
    const {profileForm} = useProfileForm();
    const merchant = useMerchant();
    const user = useUser();
    const [numberOfLikes, setNumberOfLikes] = useState(merchant?.numberOfLikes);
    const [numberOfProducts, setNumberOfProducts] = useState(merchant?.numberOfProducts);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        inputFileRef.current?.click();
    };
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
            <input
                ref={inputFileRef}
                type="file"
                accept="image/*"
                style={{display: "none"}}
                multiple={false}
                onChange={(e) => {
                    if (e.target.files) {
                        onAvatarChange(e.target.files[0]);
                    }
                }}
            />
            {
                (merchant?.avatar || profileForm?.avatar) ?
                    <AvatarBase64
                        data={profileForm?.avatar?.data || merchant?.avatar?.data}
                        alt={merchant?.avatar?.alt_texts?.toString() || 'avatar'}
                        variant={'rounded'}
                        size={'sm'}
                        className={twJoin(
                            'mx-auto rounded-[30px]',
                            'h-[200px] aspect-[1/1] w-fit'
                        )}
                        onClick={handleAvatarClick}
                        loading={'lazy'}
                    />
                    :
                    <Card
                        className={twJoin(
                            'flex flex-col items-center justify-center',
                            'bg-grvd-theme-sys-dark-surface-container',
                            'text-grvd-theme-sys-dark-primary',
                            'mx-auto rounded-[30px]',
                            'h-[200px] aspect-[1/1] w-fit',
                            'cursor-pointer',
                        )}
                        onClick={handleAvatarClick}
                    >
                        <IoIosAdd size={32}/>
                        <Typography variant={'lead'}>Add avatar</Typography>
                        <Typography variant={'small'} className={'text-grvd-theme-sys-dark-on-primary-variant'}>JPEG,
                            PNG, GIF, JPG</Typography>
                    </Card>
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
                        {merchant?.name}
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
        </div>
    );
}


export function ProfileFormArea() {
    const {setProfileForm} = React.useContext(ProfileFormContext);
    const {buttonSave} = useToolbar();
    const merchant = useMerchant();
    const user = useUser();

    const [email, setEmail] = useState(merchant?.email || user?.email);
    const [phone, setPhone] = useState(merchant?.phone);
    const [address, setAddress] = useState(merchant?.address);
    const [description, setDescription] = useState(merchant?.description);
    const [slogan, setSlogan] = useState(merchant?.slogan);
    const [socialLinks, setSocialLinks] = useState(merchant?.socialLinks);
    const [facebookLink, setFacebookLink] = useState(merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'facebook')?.link);
    const [twitterLink, setTwitterLink] = useState(merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'twitter')?.link);
    const [instagramLink, setInstagramLink] = useState(merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'instagram')?.link);
    const [avatar, setAvatar] = useState<TAvatar2D>(merchant?.avatar?.data);
    const [fileAvatar, setFileAvatar] = useState<File | null>(null);
    const {setButtonSave} = useToolbar();
    const {
        register,
        handleSubmit,
        formState: {
            isLoading,
            isSubmitting,
            isSubmitSuccessful,
            errors,
        },
        reset,
        setValue,
    } = useForm<TFormInput>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resetOptions: {
            keepIsSubmitSuccessful: false,
            keepIsSubmitted: false,
            keepErrors: false,
        },
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
        const socialLinks: TSocialLink[] = [
            {
                id: merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'facebook')?.id,
                provider: 'facebook',
                data: data.facebookLink
            },
            {
                id: merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'twitter')?.id,
                provider: 'twitter',
                data: data.twitterLink
            },
            {
                id: merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'instagram')?.id,
                provider: 'instagram',
                data: data.instagramLink
            }
        ];
        await axios
            .patch(`${config.server.url}/merchants/${merchant?.id}`, {
                email: data.email,
                phone: data.phone,
                address: data.address,
                description: data.description,
                slogan: data.slogan,
                socialLinks: socialLinks,
                avatar: {
                    data: encode(avatar?.data),
                },
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
                maxLength: {value: 30, message: 'Slogan should have a maximum of 30 characters'},
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
                    message: 'Invalid email address. Please enter a valid email address.'
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
            register: register('twitterLink', {})
        },
        instagramLink: {
            title: 'Instagram',
            register: register('instagramLink', {})
        },

    };
    const handleAvatarChange = (file: File) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target?.result;
                if (reader.result instanceof ArrayBuffer) {
                    const arrayBuffer = reader.result;
                    if (data) {
                        setAvatar({
                            data: arrayBuffer,
                        });
                        setFileAvatar(file);
                    }
                }
            }
            reader.readAsArrayBuffer(file);
        }
    };
    const onChange=()=>{
        if (!isSubmitSuccessful) return;
        reset({
            email,
            phone,
            address,
            description,
            slogan,
            facebookLink,
            twitterLink,
            instagramLink,
            avatar
        }, {
            keepIsSubmitted: false,
            keepIsSubmitSuccessful: false,
        })
    }
    useEffect(() => {
        if (setButtonSave) {
            setButtonSave({
                isloading: isSubmitting && isLoading,
                isdone: isSubmitSuccessful,
                label: {
                    labelDefault: 'Save',
                    labelLoading: 'Saving...',
                    labelDone: 'Saved',
                    labelError: 'Error',
                },
                children: 'Save',
            });
        }
    }, [isSubmitting, isLoading, isSubmitSuccessful]);

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

        setValue('email', merchant?.email as string);
        setValue('phone', merchant?.phone as string);
        setValue('address', merchant?.address as string);
        setValue('description', merchant?.description as string);
        setValue('slogan', merchant?.slogan as string);
        setValue('facebookLink', merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'facebook')?.data as string);
        setValue('twitterLink', merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'twitter')?.data as string);
        setValue('instagramLink', merchant?.socialLinks?.find((socialLink: any) => socialLink.provider === 'instagram')?.data as string);

    }, [merchant]);
    useEffect(() => {
        setProfileForm({
            name: merchant?.name,
            email: email || merchant?.email,
            phone: phone || merchant?.phone,
            address: address || merchant?.address,
            description: description || merchant?.description,
            slogan: slogan || merchant?.slogan,
            socialLinks: socialLinks || merchant?.socialLinks,
            avatar: avatar || merchant?.avatar,
            numberOfLikes: merchant?.numberOfLikes,
            numberOfProducts: merchant?.numberOfProducts,
        })
    }, [email, phone, address, description, slogan, socialLinks, avatar]);
    return (
        <div className={twJoin(
            'w-full h-fit flex flex-col gap-4',
        )}>
            <ProfileAvatarArea
                onAvatarChange={handleAvatarChange}
            />
            <form
                className={classNames(
                    'flex flex-col flex-wrap gap-4',
                )}
                id={'profile-form'}
                onSubmit={handleSubmit(onSubmit)}
                onChange={onChange}
            >
                <TextareaWithTitle
                    variant={'static'}
                    title={inputItems.description.title}
                    style={{
                        scrollbarGutter: 'hidden',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(0,0,0,0.1) transparent',
                    }}
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
                        Slogan should have a maximum of 50 characters
                    </Typography>
                </div>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-error font-medium'}
                >
                    {errors.slogan?.message}
                </Typography>
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
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-error font-medium'}
                    >
                    {errors.email?.message}
                </Typography>
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
            </form>
        </div>
    );
}

export function ProfileDetailForEdit({className, ...props}: IPageProps) {
    const merchant = useMerchant();
    const [profileForm, setProfileForm] = useState<TMerchant | null>(merchant as TMerchant);
    return (
        <ProfileFormContext.Provider value={{profileForm, setProfileForm}}>
            <div>
                <div className={twJoin(
                    'flex flex-row justify-between gap-16',
                    'w-full h-full',
                    'relative',
                )}>
                    <ProfileFormArea/>
                    <MerchantContext.Provider value={profileForm as TMerchant}>
                        <div className={twJoin(
                            'flex flex-col items-center px-8 gap-8',
                            'h-full',
                            'sticky top-12',
                        )}>
                            <ProfileCard typeCustom={'glass'}/>
                            <div className={'w-full flex flex-col gap-2'}>
                                <Typography
                                    variant={'h4'}
                                    className={'text-grvd-theme-sys-dark-primary font-bold'}
                                >
                                    Business Card
                                </Typography>
                                <Typography
                                    variant={'paragraph'}
                                    className={'text-grvd-theme-sys-dark-primary'}
                                >
                                    Use collection of template business,
                                    export and share with everyone
                                </Typography>
                            </div>
                        </div>
                    </MerchantContext.Provider>
                </div>
            </div>
        </ProfileFormContext.Provider>
    );

}