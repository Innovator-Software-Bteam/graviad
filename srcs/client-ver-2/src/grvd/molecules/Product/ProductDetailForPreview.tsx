import {TMerchant, TProduct, TUser} from "grvd";
import {
    ProductContext,
    OwnerContext,
    TProductPreviewProps,
    IProductPreview3DAreaProps,
    IProductSpecificationsAreaProps, IProductDetailsAreaProps, TProductTerms, IProductOwnerAreaProps
} from "grvd/molecules/Product";
import {ComponentProps, useEffect, useState, useContext} from "react";
import axios from "axios";
import config from "../../../config";
import {Avatar, Card, Typography} from "@material-tailwind/react";
import {twJoin} from "tailwind-merge";
import {Label, Button} from "grvd/components";
import {GiTwoCoins} from "react-icons/gi";
import {AiOutlineLike} from "react-icons/ai";

export function ProductOwnerArea({}: IProductOwnerAreaProps) {
    const owner = useContext(OwnerContext);
    return (
        <div>
            <OwnerShortcutArea/>
        </div>
    );
}

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
                    'grid grid-cols-3 grid-row-2 gap-4'
                )}>
                    <ProductPreview3DArea product={prod} id={id} className={'col-span-full'}/>
                    <ProductContentArea product={prod} id={id} className={'row-span-1 col-span-2'}/>
                    <ProductOwnerArea product={product} id={id} owner={owner} className={'col-start-3 row-span-1'}/>
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
            'flex flex-col gap-4 w-full h-full',
            className
        )}>
            <ProductSpecificationsArea product={product} id={id}/>
            <ProductDetailsArea product={product} id={id}/>
        </div>
    )
}


export function ProductPreview3DArea({id, className, ...props}: IProductPreview3DAreaProps) {
    const product = useContext(ProductContext);
    return (
        <Card
            className={twJoin(
                'relative',
                'w-full h-full min-h-[50vh] rounded-3xl',
                'bg-grvd-theme-sys-dark-surface-container-lowest',
                className
            )}
        >
            <Label className={'absolute top-8 left-8'}>{product?.highlightLabel}</Label>
            <Card
                className={twJoin(
                    'absolute bottom-8 right-8',
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
        <Card className={twJoin(
            'p-6 rounded-3xl',
            'bg-grvd-theme-sys-dark-surface-container',
            'flex flex-row justify-between items-center gap-4',
            className
        )}>
            <div className={'flex flex-col w-full'}>
                <Typography
                    variant={'h1'}
                    className={'text-grvd-theme-sys-dark-primary font-bold'}
                >
                    {product?.name}
                </Typography>
                <Typography
                    variant={'lead'}
                    className={twJoin(
                        'text-yellow-500 font-bold text-2xl',
                        'flex flex-row items-center gap-2'
                    )}
                >
                    {product?.price}
                    <GiTwoCoins size={32} color={'yellow'}/>
                </Typography>
            </div>
            <div className={'flex flex-row gap-4 justify-end w-full'}>
                <Typography
                    variant={'small'}
                    className={twJoin(
                        'flex flex-row gap-2 items-center',
                        'text-grvd-theme-sys-dark-primary font-medium'
                    )}>
                    <AiOutlineLike size={20}/>
                    {product?.numberOfLikes}
                </Typography>
                <Button colorCustom={'primary'} sizeCustom={'lg'} onClick={handleGoToProductLink}>Go to product link</Button>
            </div>
        </Card>
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
    const loadUser = async () => {
        await axios.get(`${config.server.url}/users/search?email=${owner?.email}`, {
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
            <Button colorCustom={'secondary'} sizeCustom={'lg'}>+ Follow</Button>
        </Card>
    );
}

