import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../../config";
import {TMerchant, TProduct, TUser} from "grvd";
import {Avatar, Card, Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";
import {AiOutlineLike} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {ProductContext, OwnerContext, useOwner, IProductCardProps} from "grvd/molecules/Product";
import {Buffer} from 'buffer';
import {UserContext, useUser} from "grvd/pages";
import LazyLoad from 'react-lazyload';

export function ImagePlaceholderSkeleton() {
    return (
        <div className={twJoin(
            "flex aspect-[3/2] w-[300px] rounded-lg border-transparent",
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

export function ProductCardOwnerArea() {
    const user = useUser();
    const owner = useOwner();
    return (
        <div className={'flex flex-row gap-4 items-center'}>
            {user?.profile?.photos &&
                <Avatar
                    src={user?.profile?.photos[0].value}
                    size={'md'}
                    variant={'rounded'}
                />
            }
            <div className={'border-l-2 rounded-full border-grvd-theme-sys-dark-outline h-[80%] solid mx-0 my-[10px]'}/>
            <div>
                <Typography variant={'h6'} className={'text-grvd-theme-sys-dark-primary'}>{owner?.name}</Typography>
                <Typography variant={'small'} className={'font-medium'}>{owner?.numberOfProducts}</Typography>
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
            src={`data:image/jpeg;base64,${base64String}`}
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

export function ProductCardSkeleton() {
    return (
        <Card
            className={twJoin(
                'p-6 w-full relative max-w-fit aspect-[3/4]',
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

export function ProductCard({id, product, className}: IProductCardProps) {
    const navigate = useNavigate();
    const [prod, setProd] = useState<TProduct>();
    const [owner, setOwner] = useState<TMerchant>();
    const [user, setUser] = useState<TUser>();

    const loadProduct = async () => {
        if (product) {
            product.dateRelease = new Date(product?.dateRelease || new Date());
            setProd(product);
            return;
        }
    };
    const loadOwner = async () => {
        if (!prod) return;
        await axios.get(`${config.server.url}/merchants/${prod?.merchantId}`, {
            withCredentials: true,
        })
            .then(res => {
                setOwner(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    const loadUser = async () => {
        if (!owner) return;
        await axios.get(`${config.server.url}/users/search?`, {
            withCredentials: true,
            params: {
                email: owner?.email,
            }
        })
            .then(res => {
                const userData = res.data[0];
                userData.profile = userData.profile.data;
                setUser(userData);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const onCardClick = () => {
        navigate(`/dashboard/products/${prod?.id}`);
    }

    useEffect(() => {
        loadProduct().then().catch();
    }, [product]);
    useEffect(() => {
        loadOwner().then().catch();
    }, [prod]);
    useEffect(() => {
        loadUser().then().catch();
    }, [owner]);


    return (
        <ProductContext.Provider value={prod}>
            <OwnerContext.Provider value={owner}>
                <UserContext.Provider value={user}>
                    <Card
                        key={prod?.id || id}
                        className={twJoin(
                            'p-6 w-full min-w-fit relative max-w-[350px]',
                            'justify-between gap-8',
                            'bg-transparent',
                            className
                        )}
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
                            <ProductCardOwnerArea/>
                            <div className={'flex flex-row items-center justify-between w-full'}>
                                <Typography
                                    className={'flex flex-row items-center gap-2 font-medium text-grvd-theme-sys-dark-on-primary-variant'}
                                    variant={'small'}
                                >
                                    <AiOutlineLike size={16}/>
                                    {prod?.numberOfLikes}
                                </Typography>
                                <Typography
                                    variant={'paragraph'}
                                    className={'text-grvd-theme-sys-dark-on-primary-variant font-medium text-sm'}>
                                    {prod?.dateRelease?.toLocaleDateString('en-En', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </Typography>
                            </div>
                        </div>
                    </Card>
                </UserContext.Provider>
            </OwnerContext.Provider>
        </ProductContext.Provider>
    );
}

export function ProductCardsContainer() {
    const [products, setProducts] = useState<TProduct []>([]);
    const [productSkeletons, setProductSkeletons] = useState<number []>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const loadProducts = async () => {
        setIsLoading(true);
        await axios.get(`${config.server.url}/products`, {
            withCredentials: true,
            params: {
                thumbnail2D: true,
            }
        })
            .then(res => {
                setProducts(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    };
    useEffect(() => {
        loadProducts().then().catch();
    }, []);

    return (
        <div className={twJoin(
            'grid',
            'gap-16', // replace g with your gap value
            'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
            'auto-rows-auto',
        )}>
            {isLoading && productSkeletons.map((_, index) => (
                <ProductCardSkeleton key={index}/>
            ))}
            {!isLoading && products.map((product, index) => (
                <LazyLoad once offset={1000} classNamePrefix={'blur-[1000px]'}>
                    <ProductCard key={product.id} product={product}/>
                </LazyLoad>
            ))}
        </div>
    );
}
