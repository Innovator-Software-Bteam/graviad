import {TMerchant, TProduct, TUser} from "grvd";
import {
    ProductContext,
    OwnerContext,
    TProductPreviewProps,
    IProductPreview3DAreaProps,
    IProductSpecificationsAreaProps, IProductDetailsAreaProps, TProductTerms, useProduct
} from "grvd/molecules/Product";
import {ComponentProps, useEffect, useState, useContext} from "react";
import axios from "axios";
import config from "../../../config";
import {Avatar, Card, Spinner, Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";
import {Label, Button} from "grvd/components";
import {GiTwoCoins} from "react-icons/gi";
import {LuHeart} from "react-icons/lu";


export function ProductDetailForPreview({id, product}: TProductPreviewProps) {
    const [owner, setOwner] = useState<TMerchant>();
    const [prod, setProd] = useState<TProduct>();
    const loadProduct = async () => {
        if (!product) {
            await axios.get(`${config.server.url}/products/${id}`,
                {
                    withCredentials: true,
                })
                .then(res => {
                    res.data.dateRelease = new Date(res.data.dateRelease);
                    setProd(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            setProd(product);
        }
    };
    const loadOwner = async () => {
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
    useEffect(() => {
        loadProduct();
    }, []);
    useEffect(() => {
        if (prod) {
            loadOwner();
        }
    }, [prod]);
    return (
        <ProductContext.Provider value={prod}>
            <OwnerContext.Provider value={owner}>
                <div className={twJoin(
                    'flex flex-row justify-between items-center gap-32 w-full h-full',
                    'p-16'
                )}>
                    <ProductContentArea/>
                    <ProductPreview3DArea/>
                </div>
            </OwnerContext.Provider>
        </ProductContext.Provider>
    );
}


export interface IProductProps extends ComponentProps<'div'> {
    id?: string;
    product?: TProduct;
}

export interface IProductContentAreaProps extends IProductProps {

}

export function ProductContentArea({product, id, className, ...props}: IProductContentAreaProps) {
    return (
        <div className={twJoin(
            className
        )}>
            <ProductSpecificationsArea product={product} id={id}/>
            {/*<ProductDetailsArea product={product} id={id}/>*/}
        </div>
    )
}


export function ProductPreview3DArea({id, className, ...props}: IProductPreview3DAreaProps) {
    const product = useProduct();
    return (
        <Card
            className={twJoin(
                'relative',
                'w-2/3 aspect-video rounded-3xl',
                'bg-grvd-theme-sys-dark-surface-container-lowest',
                'overflow-clip',
                className
            )}
        >
            {product?.mediaFromSpline?
                <iframe src={product?.mediaFromSpline?.data}
                        width='100%' height='100%'></iframe>
                :
                <div className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
                    <Spinner className="h-12 w-12"/>
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
                                              product: availableProduct,
                                              id,
                                              className,
                                              ...props
                                          }: IProductSpecificationsAreaProps) {
    const product = useContext(ProductContext);
    const handleGoToProductLink = () => {
        window.open(product?.link, '_blank');
    }
    return (
        <div className={twJoin(
            'flex flex-col gap-8 w-[30em] max-w-[50em]',
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
            <div className={'flex flex-row items-center w-full gap-4'}>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="2" height="30%" viewBox="0 0 2 37" fill="none">
                    <path d="M0.784668 0.5L0.784666 36.5" stroke="#9A9A9A" strokeLinecap="round"/>
                </svg>
                <div>
                    <Typography
                        variant={'small'}
                        className={twJoin(
                            'text-grvd-theme-sys-dark-primary font-medium',
                            'flex flex-row items-center gap-2'
                        )}
                    >
                        <LuHeart size={20}/>
                        {product?.price}
                    </Typography>
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
        </div>
    );
}

export function ProductDetailsArea({product: availableProduct, id, ...props}: IProductDetailsAreaProps) {
    const product = useContext(ProductContext);
    const terms: TProductTerms[] = [
        {
            term: 'Description',
            content: product?.description
        },
        // {
        //     term: 'Feature',
        //     content: product?.features
        // }
    ];
    const renderTerms = (term: TProductTerms) => {
        return (
            <div className={twJoin(
                'flex flex-col gap-4',
            )}>
                <Typography variant={'lead'}
                            className={'text-grvd-theme-sys-dark-primary font-semibold'}>{term.term}</Typography>
                <Typography variant={'paragraph'}
                            className={'text-grvd-theme-sys-dark-on-primary-variant'}>{term.content}</Typography>
            </div>
        );
    }
    return (
        <div>
            {terms.map((term) => renderTerms(term))}
        </div>
    );
}


export function OwnerShortcutArea() {
    const owner = useContext(OwnerContext);
    const [user, setUser] = useState<TUser>();
    const loadUser = () => {
        axios.get(`${config.server.url}/users/search?email=${owner?.email}`, {
            withCredentials: true,
        })
            .then(res => {
                setUser({
                    ...res.data[0],
                    profile: res.data[0]?.profile.data,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    useEffect(() => {
        loadUser();
    }, [owner]);
    return (
        <Card
            color={'transparent'}
            shadow={false}
            className={twJoin(
                'flex flex-row justify-between items-center',
            )}
        >
            <div className={'flex flex-row gap-4'}>
                {user?.profile?.photos &&
                    <Avatar
                        src={user?.profile?.photos[0].value}
                        size={'md'}
                        className={'outline outline-offset-4 outline-1 outline-grvd-theme-sys-dark-tertiary'}
                    />
                }
                <div className={'border-l-2 rounded-full border-grvd-theme-sys-dark-outline solid mx-0 my-[10px]'}/>
                <div>
                    <Typography variant={'h5'} className={'text-grvd-theme-sys-dark-primary'}>{owner?.name}</Typography>
                    <Typography variant={'small'}>{owner?.numberOfProducts}</Typography>
                </div>
            </div>
            <Button colorcustom={'secondary'} sizecustom={'lg'}>+ Follow</Button>
        </Card>
    );
}

