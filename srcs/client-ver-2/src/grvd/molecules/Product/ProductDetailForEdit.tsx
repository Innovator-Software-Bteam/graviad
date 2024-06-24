import {
    IProductDetailForEditProps,
    IProductDetailForm,
    IProductFeatureEditAreaProps, ProductCard,
    TProductDetailForm
} from "grvd/molecules/Product";
import {useForm} from "react-hook-form";
import {TProduct, TProductFeature, TProductFeatureKey, TThumbnail2D} from "grvd";
import {Card, Spinner, Typography} from "@material-tailwind/react";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import config from "../../../config";
import {Button, ButtonWithLoading, InputTypeFile, InputWithTitle, TextareaWithTitle} from "grvd/components";
import {CiHeart} from "react-icons/ci";
import {twJoin} from "tailwind-merge";
import {MdDeleteForever} from "react-icons/md";
import {TInput} from "grvd/molecules";
import {ProductContext, useProduct} from "grvd/contexts";
import {DialogErrorContext, useDialog} from "grvd/organisms";
import {useParams} from "react-router-dom";
import {decode, encode} from "base64-arraybuffer";

type TProductFormContext = {
    productForm: TProduct | null;
    setProductForm: React.Dispatch<React.SetStateAction<TProduct | null>>;
};
const ProductFormContext = React.createContext<TProductFormContext>({
    productForm: null,
    setProductForm: () => {
    }
});

export function ProductFeatureEditArea({features, setFeatures}: IProductFeatureEditAreaProps) {
    const product = useProduct();
    const handleAddFeature = () => {
        const placeholderFeature: TProductFeature = {
            name: 'Feature',
            description: 'Change me',
            productId: product?.id,
        };
        setFeatures([...features || [], placeholderFeature]);
    };
    const handleRemoveFeature = (index: number) => {
        const newFeatures = [...features || []];
        newFeatures.splice(index, 1);
        setFeatures(newFeatures);
    }
    const handleFeatureChange = (index: number, key: TProductFeatureKey, value: string) => {
        const newFeatures = [...features || []];
        newFeatures[index][key] = value;
        setFeatures(newFeatures);
    };

    const renderFeature = (feature: TProductFeature, index: number) => {
        return (
            <div key={index} className={twJoin(
                'flex flex-row items-center gap-2',
                'p-4 rounded-lg',
                'bg-grvd-theme-sys-dark-surface-container-lower'
            )}>
                <div className={twJoin(
                    'flex flex-col gap-2',
                    'w-full'
                )}>
                    <input
                        value={feature.name}
                        onChange={(e) => handleFeatureChange(index, 'name', e.target.value)}
                        onClick={(e) => {
                            e.currentTarget.select();
                        }}
                        className={'bg-transparent border-none text-grvd-theme-sys-dark-primary font-semibold text-base outline-none'}
                    />
                    <input
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        onClick={(e) => {
                            e.currentTarget.select();
                        }}
                        className={'bg-transparent border-none text-grvd-theme-sys-dark-primary font-light text-base outline-none'}
                    />
                </div>

                <MdDeleteForever
                    size={20} color={'white'}
                    onClick={() => {
                        handleRemoveFeature(index)
                    }}
                    className={twJoin(
                        'cursor-pointer',
                        'hover:scale-125',
                    )}
                />
            </div>
        );
    };
    return (
        <div>
            <Typography className={twJoin(
                'text-grvd-theme-sys-dark-primary font-semibold text-base'
            )}>
                Features
            </Typography>
            <div className={twJoin(
                'flex flex-col gap-4',
            )}>
                {features && features.map((feature, index) => renderFeature(feature, index))}
                <Button
                    onClick={handleAddFeature}
                    colorcustom={'secondary'}
                    sizecustom={'lg'}
                >
                    Add feature
                </Button>
            </div>
        </div>
    )
}

export function ProductDetailFileUploadArea() {
    return (
        <div>
            <InputTypeFile
                title={'Thumbnail'}
                name={'fileThumbnail'}
                listaccept={'Accepts jpg, jpeg, png'}
                accept={'.jpg, .jpeg, .png'}
                className={'h-fit aspect-auto bg-white/5'}
                color={'white'}
                multiple={false}
            />
        </div>
    );
}

export function ProductDetailFormArea({className}: IProductDetailForm) {
    const product = useProduct();
    const {productForm, setProductForm} = useContext(ProductFormContext);
    const [features, setFeatures] = useState<TProductFeature[]>(product?.features || []);
    const [fileThumbnail, setFileThumbnail] = React.useState<File | null>(null);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [highlightLabel, setHighlightLabel] = useState<string>('');
    const [version, setVersion] = useState<string>('');
    const [brief, setBrief] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
    const [thumbnail2D, setThumbnail2D] = useState<TThumbnail2D | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setFileThumbnail(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnail2D({
                    id: product?.thumbnail2D?.id,
                    data: reader.result as ArrayBuffer,
                });
            };
            reader.readAsArrayBuffer(file);
        }
    };
    const {
        open,
    } = useDialog();
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isSubmitSuccessful,
            isSubmitted,
        }
    } = useForm<TProductDetailForm>({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            name: product?.name,
            price: product?.price as any,
            highlightLabel: product?.highlightLabel,
            version: product?.version,
            brief: product?.brief,
            link: product?.link,
            description: product?.description,
            features: product?.features,
            numberOfLikes: product?.numberOfLikes,
        },
        criteriaMode: 'firstError',
    });
    const inputItems: Record<string, TInput> = {
        name: {
            title: 'Name',
            register: register('name', {
                required: 'Name is required',
                onChange: (e) => setName(e.target.value),
            }),
        },
        price: {
            title: 'Price',
            register: register('price', {
                onChange: (e) => setPrice(parseFloat(e.target.value)),
            }),
        },
        label: {
            title: 'Label',
            register: register('highlightLabel', {
                onChange: (e) => setHighlightLabel(e.target.value),
            }),
        },
        version: {
            title: 'Version',
            register: register('version', {
                onChange: (e) => setVersion(e.target.value),
            }),
        },
        brief: {
            title: 'Brief',
            register: register('brief', {
                required: 'Brief is required',
                onChange: (e) => setBrief(e.target.value),
            }),
        },
        link: {
            title: 'Link',
            register: register('link', {
                onChange: (e) => setLink(e.target.value),
            }),
        },
        description: {
            title: 'Description',
            register: register('description', {
                onChange: (e) => setDescription(e.target.value),
            }),
        },
        features: {
            title: 'Features',
            register: register('features', {}),
        },
        fileThumbnail: {
            title: 'Thumbnail',
            register: register('fileThumbnail', {
                onChange: handleFileChange,
            }),
        }
    };

    useEffect(() => {
        setProductForm({
            name: name || product?.name as any,
            price: price || product?.price,
            highlightLabel: highlightLabel || product?.highlightLabel,
            version: version || product?.version,
            brief: brief || product?.brief,
            link: link || product?.link,
            description: description || product?.description,
            features: features || product?.features,
            numberOfLikes: numberOfLikes || product?.numberOfLikes,
            dateRelease: undefined,
            id: product?.id,
            merchantId: product?.merchantId as any,
            thumbnail2D: thumbnail2D || product?.thumbnail2D,
        })
    }, [name, price, highlightLabel, version, brief, link, description, features, numberOfLikes, fileThumbnail, thumbnail2D]);
    const onSubmit = async (data: TProductDetailForm) => {
        await axios.patch(`${config.server.url}/products/${product?.id}`,
            {
                ...data,
                dateRelease: product?.dateRelease,
                features: features,
                thumbnail2D: {
                    data: encode(thumbnail2D?.data),
                },
            },
            {
                withCredentials: true,
            })
            .then(res => {

            })
            .catch(err => {
                open('Something went wrong. Please try again!')
                console.log(err);
            });
    }
    useEffect(() => {
    }, [features]);
    return (
        <form
            className={twJoin(
                'min-w-fit flex flex-col gap-4',
                className
            )}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={'flex flex-row justify-between items-center'}>
                <input
                    className={'bg-transparent border-none text-grvd-theme-sys-dark-primary font-bold text-4xl outline-none'}
                    type={'text'}
                    {...inputItems.name.register}
                />
                <Typography
                    variant='paragraph'
                    className={twJoin(
                        'flex flex-row items-center gap-2 text-grvd-theme-sys-dark-primary'
                    )}
                >
                    <CiHeart size={20}/>
                    {product?.numberOfLikes}
                </Typography>
            </div>
            <div className={twJoin(
                'grid grid-cols-3 gap-4',
            )}>
                <InputWithTitle
                    title={inputItems.label.title}
                    {...inputItems.label.register}
                />
                <InputWithTitle
                    title={inputItems.price.title}
                    {...inputItems.price.register}
                />
                <InputWithTitle
                    title={inputItems.version.title}
                    {...inputItems.version.register}
                />
                <InputWithTitle
                    title={inputItems.link.title}
                    containerProps={{
                        className: 'col-span-3'
                    }}
                    {...inputItems.link.register}
                />
                <TextareaWithTitle
                    title={inputItems.brief.title}
                    containerProps={{
                        className: 'col-span-3'
                    }}
                    {...inputItems.brief.register}
                />
                <TextareaWithTitle
                    title={inputItems.description.title}
                    containerProps={{
                        className: 'col-span-3'
                    }}
                    {...inputItems.description.register}
                />
            </div>
            <ProductFeatureEditArea features={features} setFeatures={setFeatures}/>
            {/*<ProductDetailFileUploadArea/>*/}
            <InputTypeFile
                title={inputItems.fileThumbnail.title}
                listaccept={'Accepts jpg, jpeg, png'}
                accept={'.jpg, .jpeg, .png'}
                className={'h-fit aspect-auto bg-white/5'}
                color={'white'}
                multiple={false}
                file={fileThumbnail}
                {...inputItems.fileThumbnail.register}
            />
            <ButtonWithLoading
                type={'submit'}
                colorcustom={'primary'}
                sizecustom={'lg'}
                isloading={isSubmitting}
                isdone={isSubmitSuccessful}
                iserror={isSubmitted && !isSubmitSuccessful}
                label={{
                    labelDefault: 'Save',
                    labelLoading: 'Saving...',
                    labelDone: 'Saved',
                    labelError: 'Error',
                }}
            >
                Save
            </ButtonWithLoading>
        </form>
    );

}

export function ProductDetailPreviewArea({className}: any) {
    const {productForm} = useContext(ProductFormContext);
    const product = useProduct();
    useEffect(() => {
    }, [productForm]);

    const handleWheel = (e: React.WheelEvent<HTMLIFrameElement>) => {
        e.stopPropagation();
    };
    return (
        <div className={twJoin(
            'w-fit p-4 h-screen',
            'flex flex-col justify-start items-center gap-4',
            className
        )}
        >
            <Typography variant={'lead'} className={'text-grvd-theme-sys-dark-primary font-bold w-full text-left'}>
                Preview
            </Typography>
            <ProductCard id={product?.id}/>
            <Card
                className={twJoin(
                    'relative',
                    'w-full aspect-video rounded-3xl',
                    'bg-grvd-theme-sys-dark-surface-container-lowest',
                    'overflow-clip',
                    className
                )}
            >
                {product?.mediaFromSpline ?
                    <iframe src={product?.mediaFromSpline?.data}
                            width='100%' height='100%'
                    />
                    :
                    <div className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
                        <Spinner className="h-12 w-12"/>
                    </div>
                }
            </Card>
        </div>
    );
}

export function ProductDetailForEdit({}: IProductDetailForEditProps) {
    const {id} = useParams();
    const [prod, setProd] = useState<TProduct>();
    const product = useProduct();
    const [productForm, setProductForm] = useState<TProduct | null>(null);
    const {
        open,
    } = useDialog();
    useEffect(() => {
    }, [product]);
    const loadProduct = async () => {
        await axios.get(`${config.server.url}/products/${id}`,
            {
                withCredentials: true,
            })
            .then(res => {
                res.data.dateRelease = new Date(res.data.dateRelease);
                setProd(res.data);
                setProductForm(res.data);
            })
            .catch(err => {
                open('Something went wrong. Please try again!', 'error');
                console.log(err);
            });
    };
    useEffect(() => {
        loadProduct();
    }, []);

    return (
        <div>
            <ProductContext.Provider value={product}>
                <div className={'flex flex-row gap-8'}>
                    <ProductFormContext.Provider value={{productForm, setProductForm}}>
                        <ProductDetailFormArea className={'grow-[2]'}/>
                        <ProductDetailPreviewArea className={'sticky top-0'}/>
                    </ProductFormContext.Provider>
                </div>
            </ProductContext.Provider>
        </div>
    )
}