import {TMerchant, TProduct, TProductFeature, TUser} from "grvd";
import {
    IProductPreview3DAreaProps,
    IProductSpecificationsAreaProps
} from "grvd/molecules/Product";
import {ComponentProps, useEffect, useState, useContext} from "react";
import axios from "axios";
import config from "../../../config";
import {Avatar, Card, Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";
import {Label, Button,Spinner} from "grvd/components";
import {GiTwoCoins} from "react-icons/gi";
import {LuHeart} from "react-icons/lu";
import {OwnerContext, ProductContext, useOwner, useProduct, useUser} from "grvd/contexts";
import {FaHeart} from "react-icons/fa6";
import {useDialog} from "grvd/organisms";
import {ProfileOwnerBar} from "grvd/molecules/User/ProfileOwnerBar";


export function ProductDetailForPreview({}: any) {
    const product = useProduct();
    const [owner, setOwner] = useState<TUser | undefined>(undefined);
    const {
        open,
    } = useDialog();
    const loadOwner = () => {
        if (!product?.merchant) return;
        axios
            .get(`${config.server.url}/merchants/${product?.merchant?.id}`, {
                withCredentials: true,
                params: {
                    relations: ['avatar'],
                }
            })
            .then((res) => {
                setOwner(res.data);
            })
            .catch(err => {
                open('Something went wrong. Please try again!', 'error');
                console.log(err);
            });

    };
    useEffect(() => {
        loadOwner();
    }, [product]);
    return (
        <OwnerContext.Provider value={owner}>
            <div className={twJoin(
                'flex flex-col-reverse justify-between items-center gap-16 w-full h-full',

                'sm:flex-col md:flex-col lg:flex-row xl:flex-row',
                'sm:flex-col-reverse md:flex-col-reverse lg:flex-row xl:flex-row',
            )}>
                <ProductContentArea/>
                <ProductPreview3DArea/>
            </div>
        </OwnerContext.Provider>
    );
}


export interface IProductProps extends ComponentProps<'div'> {
    id?: string;
    product?: TProduct;
}

export interface IProductContentAreaProps extends IProductProps {

}

export function ProductContentArea({className}: IProductContentAreaProps) {
    return (
        <div className={twJoin(
            'w-full min-w-[300px] h-full',
            className
        )}>
            <ProductSpecificationsArea/>
        </div>
    )
}

export function ProductPreview3DArea({id, className, ...props}: IProductPreview3DAreaProps) {
    const product = useProduct();
    return (
        <Card
            className={twJoin(
                'relative',
                'w-full min-w-[300px] aspect-video rounded-3xl',
                'bg-grvd-theme-sys-dark-surface-container-lowest',
                'overflow-clip',
                className
            )}
        >
            {product?.mediaFromSplineId ?
                <iframe src={product?.mediaFromSplineId}
                        width='100%' height='100%'></iframe>
                :
                <div className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
                    <Spinner size={48}/>
                </div>
            }
            <Card
                className={twJoin(
                    'absolute top-8 left-8 aspect-[1/1]',
                    'p-4 rounded-2xl',
                    'bg-grvd-theme-sys-dark-surface-container/50 backdrop-blur-[10px]',
                )}
            >
                <Typography variant={'paragraph'}
                            className={'text-grvd-theme-sys-dark-primary'}>{product?.version}</Typography>
                <Typography variant={'small'}
                            className={'text-grvd-theme-sys-dark-on-primary-variant'}>{product?.dateRelease?.toLocaleDateString('en-EN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })}</Typography>
            </Card>
        </Card>
    );
}


export function ProductSpecificationsArea({
                                              id,
                                              className,
                                              ...props
                                          }: IProductSpecificationsAreaProps) {
    const product = useProduct();
    const user = useUser();
    const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
    const [likedByIds, setLikedByIds] = useState<string []>([]);
    const [like, setLike] = useState<boolean>(likedByIds.includes(user?.id as string));
    const [dateRelease, setDateRelease] = useState<Date | undefined>(new Date());
    const [features, setFeatures] = useState<TProductFeature []>([]);

    const {
        open,
    } = useDialog();
    const handleGoToProductLink = () => {
        window.open(product?.link, '_blank');
    };
    const handleUserLike = async (e: any) => {
        e.stopPropagation();
        if (like) {
            let likes = product?.numberOfLikes || 0;
            likes++;
            await axios.post(`${config.server.url}/users/${user?.id}/unlike_product/${product?.id}`, {
                withCredentials: true,
            })
                .then(res => {
                    setNumberOfLikes(numberOfLikes - 1);
                })
                .catch(err => {
                    console.log(err);
                });
            setLike(false);
        } else {
            let likes = product?.numberOfLikes || 0;
            likes--;
            await axios.post(`${config.server.url}/users/${user?.id}/like_product/${product?.id}`, {
                withCredentials: true,
            })
                .then(res => {
                    setNumberOfLikes(numberOfLikes + 1);
                })
                .catch(err => {
                    open('Something went wrong. Please try again!', 'error');
                    console.log(err);
                });
            setLike(true);
        }

    };

    const renderItemFeature = (feature: TProductFeature, key: any) => {
        return (
            <div
                key={key}
                className={twJoin(
                    'flex flex-col items-center justify-center gap-4',
                    'bg-grvd-theme-sys-dark-surface-container-high rounded-2xl',
                    'py-4 w-full h-fit',
                )}
            >
                <Typography
                    variant={'lead'}
                    className={'text-grvd-theme-sys-dark-primary font-bold'}
                >
                    {feature.name}
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-on-primary-variant break-words max-w-[10em] w-[10em] text-center'}
                >
                    {feature.description}
                </Typography>
            </div>
        )
    }
    useEffect(() => {
        if (product?.numberOfLikes) {
            setNumberOfLikes(product?.numberOfLikes);
        }
        if (product?.likedByIds) {
            setLikedByIds(product?.likedByIds);
            setLike(likedByIds.includes(user?.id as string));
        }
        if (product?.dateRelease) {
            setDateRelease(product?.dateRelease);
        }
        if (product?.features) {
            setFeatures(product?.features);
        }
    }, [product]);
    return (
        <div className={twJoin(
            'flex flex-col gap-8 w-full',
            className
        )}>
            <Label border={true} className={'top-8 left-8'}>{product?.highlightLabel}</Label>
            <div className={'flex flex-col w-full'}>
                <Typography
                    variant={'h1'}
                    className={'text-grvd-theme-sys-dark-primary font-bold'}
                >
                    {product?.name}
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-primary'}>
                    {product?.description}
                </Typography>
            </div>
            <div className={'flex flex-row items-center justify-between w-full gap-4'}>
                <Typography
                    variant={'paragraph'}
                    className={twJoin(
                        'text-[#FAC600] font-bold text-3xl',
                        'flex flex-row items-center gap-2'
                    )}
                >
                    {product?.price}
                    <GiTwoCoins size={32} color={'#FAC600'}/>
                </Typography>
                <div className={'flex flex-row items-center gap-4'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2" height="30%" viewBox="0 0 2 37" fill="none">
                        <path d="M0.784668 0.5L0.784666 36.5" stroke="#9A9A9A" strokeLinecap="round"/>
                    </svg>
                    <div className={'flex flex-row items-center justify-between w-full'}>
                        <Typography
                            className={'flex flex-row items-center gap-2 font-medium text-grvd-theme-sys-dark-on-primary-variant'}
                            variant={'small'}
                        >
                            {
                                !like ?
                                    <LuHeart
                                        size={20}
                                        onClick={handleUserLike}
                                        className={twJoin(
                                            'cursor-pointer',
                                            'hover:text-grvd-theme-sys-dark-primary hover:scale-110',
                                            'active:text-grvd-theme-sys-dark-primary',
                                            'transition-all duration-300 ease-in-out',
                                        )}/>
                                    :
                                    <FaHeart
                                        size={20}
                                        onClick={handleUserLike}
                                        color={'red'}
                                        className={twJoin(
                                            'cursor-pointer',
                                            'hover:text-grvd-theme-sys-dark-primary hover:scale-110',
                                            'active:text-grvd-theme-sys-dark-primary',
                                            'transition-all duration-300 ease-in-out',
                                        )}
                                    />
                            }
                            {numberOfLikes}
                        </Typography>
                    </div>

                </div>
            </div>
            <OwnerShortcutArea/>
            <Button
                colorcustom={'primary'}
                sizecustom={'lg'}
                className={'w-fit'}
                onClick={handleGoToProductLink}
            >
                Go to product link
            </Button>
            {
                features.length > 0 &&
                <div className={'flex flex-col gap-4 w-full'}>
                    <Typography
                        variant={'h6'}
                        className={'text-grvd-theme-sys-dark-primary font-bold'}
                    >
                        Features
                    </Typography>
                    <div className={'flex flex-wrap gap-4'}>
                        {features.map((feature, index) => renderItemFeature(feature, index))}
                    </div>
                </div>
            }
        </div>
    );
}

export function OwnerShortcutArea() {
    const owner = useOwner();
    useEffect(() => {
    }, [owner]);
    return (
        <ProfileOwnerBar owner={owner as any}/>
    );
}

