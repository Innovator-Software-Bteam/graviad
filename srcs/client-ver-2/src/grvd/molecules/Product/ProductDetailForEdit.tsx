import {
    IProductDetailForEditProps,
    IProductDetailForm,
    IProductFeatureEditAreaProps, ProductCard,
    TProductDetailForm
} from "grvd/molecules/Product";
import {useForm} from "react-hook-form";
import {TMediaFromSpline, TProduct, TProductFeature, TProductFeatureKey, TThumbnail2D} from "grvd";
import {Card, Typography} from "@material-tailwind/react";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import config from "../../../config";
import {Button, InputTypeFile, InputWithTitle, TextareaWithTitle, Spinner, Input} from "grvd/components";
import {twJoin} from "tailwind-merge";
import {MdDeleteForever} from "react-icons/md";
import {TInput} from "grvd/molecules";
import {ProductContext, useProduct} from "grvd/contexts";
import {useDialog} from "grvd/organisms";
import {useParams} from "react-router-dom";
import {encode} from "base64-arraybuffer";
import {useToolbar} from "grvd/pages";
import {FaHeart, FaRegHeart} from "react-icons/fa6";

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
        if (product?.features[index].id) {
            newFeatures[index].id = product?.features[index].id;
        }
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
    const [price, setPrice] = useState<string>('0');
    const [highlightLabel, setHighlightLabel] = useState<string>('');
    const [version, setVersion] = useState<string>('');
    const [brief, setBrief] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [numberOfLikes, setNumberOfLikes] = useState<number>(0);
    const [thumbnail2D, setThumbnail2D] = useState<TThumbnail2D | null>(null);
    const [mediaFromSpline, setMediaFromSpline] = React.useState<TMediaFromSpline | null>();
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
    const {setButtonSave} = useToolbar()
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isSubmitSuccessful,
            isSubmitted,
            isLoading,
        },
        reset
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
            mediaFromSplineId: product?.mediaFromSplineId,
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
                onChange: (e) => setPrice(e.target.value),
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
        },
        mediaFromSplineId: {
            title: '3D Model',
            register: register('mediaFromSplineId', {
                required: false,
                onChange: (e) => setMediaFromSpline(value => ({
                    data: e.target.value,
                })),
                pattern: {
                    value: /^https|http:\/\/my.spline.design.*/,
                    message: 'Invalid spline url'
                }
            }),
        },
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
            mediaFromSpline: mediaFromSpline || product?.mediaFromSpline,
        })
    }, [name, price, highlightLabel, version, brief, link, description, features, numberOfLikes, fileThumbnail, thumbnail2D]);
    const onSubmit = async (data: TProductDetailForm) => {
        console.log(features);
        await axios.patch(`${config.server.url}/products/${product?.id}`,
            {
                ...data,
                dateRelease: product?.dateRelease,
                features: features,
                thumbnail2D: {
                    data: encode(thumbnail2D?.data),
                },
                mediaFromSplineId: data.mediaFromSplineId || data.mediaFromSplineId,
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
    };
    const onChange = () => {
        if(!isSubmitSuccessful) return;
        reset({
            name,
            highlightLabel,
            version,
            brief,
            link,
            description,
            features,
            numberOfLikes,
            price,
        }, {
            keepIsSubmitSuccessful: false,
            keepErrors: false,
            keepIsSubmitted: false,
        })
    };
    useEffect(() => {
    }, [features]);
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
    return (
        <form
            className={twJoin(
                'flex flex-col gap-4',
                'w-full',
                'md:min-w-fit md:w-full',
                'mb-32',
                className
            )}
            id={'product-form'}
            onSubmit={handleSubmit(onSubmit)}
            onChange={onChange}
        >
            <div className={'flex flex-row justify-between items-center w-full'}>
                <input
                    className={'bg-transparent border-none text-grvd-theme-sys-dark-primary font-bold text-4xl outline-none w-[10em] min-w-[200px]break-words'}
                    type={'text'}
                    {...inputItems.name.register}
                />
                <Typography
                    variant='paragraph'
                    className={twJoin(
                        'flex flex-row items-center gap-2 text-grvd-theme-sys-dark-primary font-semibold',
                        'text-red-700'
                    )}
                >
                    <FaHeart size={20}/>
                    {product?.numberOfLikes}
                </Typography>
            </div>
            <div className={twJoin(
                'flex flex-col gap-4',
                'md:grid md:grid-cols-3 md:gap-4',
                'lg:grid lg:grid-cols-3 lg:gap-4',
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
            <Input
                type={'url'}
                title={inputItems.mediaFromSplineId.title}
                placeholder={'Media from spline'}
                icon={
                    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink">
                        <rect width="32" height="32" fill="url(#pattern0_1189_7442)"/>
                        <defs>
                            <pattern id="pattern0_1189_7442" patternContentUnits="objectBoundingBox"
                                     width="1" height="1">
                                <use xlinkHref="#image0_1189_7442" transform="scale(0.03125)"/>
                            </pattern>
                            <image id="image0_1189_7442" width="32" height="32"
                                   xlinkHref="data:image/png;base64,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"/>
                        </defs>
                    </svg>
                }
                {...inputItems.mediaFromSplineId.register}
            />
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
                    <iframe src={product?.mediaFromSplineId}
                            width='100%' height='100%'
                    />
                    :
                    <div className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
                        <Spinner size={32}/>
                    </div>
                }
            </Card>
        </div>
    );
}

export function ProductDetailForEdit({}: IProductDetailForEditProps) {
    const {id} = useParams();
    const product = useProduct();
    const [productForm, setProductForm] = useState<TProduct | null>(null);
    const {
        open,
    } = useDialog();
    return (
        <div>
            <ProductContext.Provider value={product}>
                <div className={twJoin(
                    'flex flex-col gap-8',
                    'w-full',
                    'md:flex-row md:gap-8',
                    'lg:flex-row lg:gap-8',
                )}>
                    <ProductFormContext.Provider value={{productForm, setProductForm}}>
                        <ProductDetailFormArea className={'md:grow-[2] lg:grow-[2]'}/>
                        <ProductDetailPreviewArea className={'sticky top-0'}/>
                    </ProductFormContext.Provider>
                </div>
            </ProductContext.Provider>
        </div>
    )
}