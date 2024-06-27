import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../../config";
import {TMerchant, TProduct} from "grvd";
import {Card, Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";
import {useNavigate} from "react-router-dom";
import {IProductCardProps} from "grvd/molecules/Product";
import {Buffer} from 'buffer';
import LazyLoad from 'react-lazyload';
import {AvatarBase64} from "grvd/components/Avatar";
import {useUser} from "grvd/contexts";
import {FaHeart} from "react-icons/fa6";
import {LuHeart} from "react-icons/lu";
import {ProductContext, OwnerContext, useOwner} from "grvd/contexts";
import {ProtectedFeatureRequiredLogin} from "grvd/protected";
import {useDialog} from "grvd/organisms";
import {useFilterInput} from "grvd/organisms/SearchInput/FilterInputContext";
import {ProfileOwnerBar} from "grvd/molecules/User/ProfileOwnerBar";

export function ImagePlaceholderSkeleton() {
    return (
        <div className={twJoin(
            "flex aspect-[3/2] w-full rounded-lg border-transparent",
            "bg-grvd-theme-sys-dark-surface-container-lowest animate-pulse",
        )}>
        </div>
    );
}

export function ProductCardOwnerAreaSkeleton() {
    return (
        <div className={'flex flex-row gap-4 items-center'}>
            <div className={'w-12 h-12 rounded-full bg-grvd-theme-sys-dark-surface-container-low animate-pulse'}/>
            <div>
                <Typography
                    variant={'paragraph'}
                    className={'\'bg-grvd-theme-sys-dark-surface-container-low font-semibold text-left mb-2 h-2 w-full rounded-full'}>
                    &nbsp;
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'\'bg-grvd-theme-sys-dark-surface-container-low font-semibold text-left mb-2 h-2 w-full rounded-full'}>
                    &nbsp;
                </Typography>
            </div>
        </div>
    );
}

function ProductThumbnail2D({data, children, className}: any) {
    const bufferData = Buffer.from(data);
    const base64String = Buffer.from(bufferData).toString('base64');
    return <div
        className={twJoin(
            'w-full h-full rounded-lg',
            'overflow-clip',
            className,
        )}
    >
        <img
            src={
                (data && base64String) ?
                    `data:image/*;base64,${base64String}`
                    :
                    `/assets/placeholder_thumbnail_product.png`
            }
            alt="From byte array"
            className={twJoin(
                '!aspect-[3/2]',
                'object-cover bg-grvd-theme-sys-dark-surface-container-low',
                'hover:scale-105 transition-transform duration-00 ease-in-out',
                'blur-[0.5px]'
            )}
            loading={'lazy'}
        />
        {children}
    </div>;
}

export function ProductCardSkeleton({id}: any) {
    return (
        <Card
            key={id}
            className={twJoin(
                'p-6 w-full min-w-fit relative max-w-[350px]',
                'shadow-[2px_2px_10px_0px_rgba(0,0,0,0.25)] backdrop-blur-[25px] rounded-[20px]',
                'bg-grvd-theme-sys-dark-surface-container-lower',
                'justify-between gap-2',
                'animate-pulse'
            )}
        >
            <ImagePlaceholderSkeleton/>
            <ProductCardOwnerAreaSkeleton/>
            <div className={'flex flex-col gap-2'}>
                <Typography variant={'small'}
                            className={'bg-grvd-theme-sys-dark-surface-container-low text-left mb-2 h-4 w-full rounded-full'}>
                    &nbsp;
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'\'bg-grvd-theme-sys-dark-surface-container-low font-semibold text-left mb-2 h-2 w-full rounded-full'}>
                    &nbsp;
                </Typography>
            </div>
        </Card>
    );
}

export function ProductCard({id, className}: IProductCardProps) {
    const navigate = useNavigate();
    const user = useUser();
    const [prod, setProd] = useState<TProduct>();
    const [owner, setOwner] = useState<TMerchant>();

    const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
    const [dateRelease, setDateRelease] = useState<Date | undefined>(new Date());
    const [likedByIds, setLikedByIds] = useState<string []>([]);
    const [like, setLike] = useState<boolean>(likedByIds.includes(user?.id as string));

    const {open} = useDialog();
    const loadProduct = async () => {
        await axios.get(`${config.server.url}/products/${id}`, {
            withCredentials: true,
            params: {
                relations: ['merchant', 'merchant.avatar', 'thumbnail2D'],
            }
        })
            .then(res => {
                const product = res.data;
                setProd(product);
                setLike(product.likedByIds.includes(user?.id as string));
                setNumberOfLikes(product.numberOfLikes);
                setLikedByIds(product.likedByIds);
                setOwner(res.data.merchant);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const onCardClick = () => {
        navigate(`/dashboard/products/${prod?.id}`,{
            state: {
                viewMode: 'preview',
            }
        });
    }
    const handleUserLike = async (e: any) => {
        if (!user) {
            return;
        }
        e.stopPropagation();
        if (like) {
            let likes = prod?.numberOfLikes || 0;
            likes++;
            await axios.post(`${config.server.url}/users/${user?.id}/unlike_product/${prod?.id}`, {
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
            let likes = prod?.numberOfLikes || 0;
            likes--;
            await axios.post(`${config.server.url}/users/${user?.id}/like_product/${prod?.id}`, {
                withCredentials: true,
            })
                .then(res => {
                    setNumberOfLikes(numberOfLikes + 1);
                })
                .catch(err => {
                    console.log(err);
                });
            setLike(true);
        }

    };
    useEffect(() => {
        loadProduct().then().catch();
    }, []);
    useEffect(() => {
        if (prod?.dateRelease) setDateRelease(new Date(prod.dateRelease));
        if (prod?.likedByIds) {
            setLikedByIds(prod?.likedByIds);
            setLike(likedByIds.includes(user?.id as string));
        }
        if (prod?.numberOfLikes) setNumberOfLikes(prod?.numberOfLikes);
    }, [prod]);

    return (
        <ProductContext.Provider value={prod}>
            <OwnerContext.Provider value={owner}>
                <Card
                    key={prod?.id || id}
                    className={twJoin(
                        'p-6 w-full min-w-[300px] relative max-w-[800px]',
                        'justify-between gap-8',
                        'bg-transparent',
                        className
                    )}
                    id={'product-card-' + prod?.id || id}
                    shadow={false}
                    onClick={onCardClick}
                >

                    {prod?.thumbnail2D?.data &&
                        <ProductThumbnail2D
                            data={prod?.thumbnail2D?.data}
                            className={'relative'}
                        >
                        </ProductThumbnail2D>
                        || <ImagePlaceholderSkeleton/>
                    }
                    <div className={'flex flex-col gap-2 justify-start'}>
                        <div className={'flex flex-col items-center justify-start'}>
                            <Typography
                                className={'text-grvd-theme-sys-dark-primary font-semibold text-left w-full break-words'}
                                variant={'h5'}>
                                {prod?.name}
                            </Typography>
                            <Typography variant={'small'}
                                        className={'text-grvd-theme-sys-dark-on-primary-variant w-full text-left break-words'}>
                                {prod?.brief}
                            </Typography>
                        </div>
                        <ProfileOwnerBar owner={owner as any} hideFollowButton={true}/>
                        <div className={'flex flex-row items-center justify-between w-full'}>
                            <ProtectedFeatureRequiredLogin>
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
                            </ProtectedFeatureRequiredLogin>
                            <Typography
                                variant={'paragraph'}
                                className={'text-grvd-theme-sys-dark-on-primary-variant font-medium text-sm'}>
                                {dateRelease?.toLocaleDateString('en-En', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                            </Typography>
                        </div>
                    </div>
                </Card>
            </OwnerContext.Provider>
        </ProductContext.Provider>
    );
}

export function ProductCardsContainer() {
    const [products, setProducts] = useState<TProduct []>([]);
    const [productSkeletons, setProductSkeletons] = useState<number []>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {handleFilter} = useFilterInput();
    const {open} = useDialog();
    const loadProducts = async () => {
        setIsLoading(true);
        await axios.get(`${config.server.url}/products`, {
            withCredentials: true,
            params: {
                relations: ['thumbnail2D'],
            }
        })
            .then(res => {
                setProducts(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                open('Something went wrong. Please try again!', 'error');
                console.log(err);
            });
    };
    useEffect(() => {
        loadProducts().then().catch();
    }, []);
    return (
        <div className={twJoin(
            'grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-auto',
            'gap-16',
            'w-full',
        )}>
            {isLoading && productSkeletons.map((_, index) => (
                <ProductCardSkeleton key={index}/>
            ))}
            {!isLoading && products.filter((product)=>{
                return handleFilter ? handleFilter(product) : true;
            }).map((product) => (
                <LazyLoad offset={1000} classNamePrefix={'blur-[1000px]'} key={product.id}>
                    <ProductCard key={product.id} id={product.id}/>
                </LazyLoad>

            ))}
        </div>
    );
}
