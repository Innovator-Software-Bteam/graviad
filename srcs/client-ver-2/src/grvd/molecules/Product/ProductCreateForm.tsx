import {Dialog, DialogBody, Typography} from "@material-tailwind/react";
import React, {useEffect} from "react";
import {Button, ButtonWithLoading, Input, InputTypeFile, Label, Textarea} from "grvd/components";
import {twJoin} from "tailwind-merge";
import {SubmitHandler, useForm} from "react-hook-form";
import {RiAdvertisementFill} from "react-icons/ri";
import axios from "axios";
import config from "../../../config";
import {encode} from "base64-arraybuffer";
import {useMerchant} from "grvd/pages";
import {TMediaFromSpline, TProduct} from "grvd";
import {IProductCreateFormProps, TInput, TProductCreateForm} from "grvd/molecules";
import {CgDanger} from "react-icons/cg";
import {useSelector} from "react-redux";
import {RootState} from "grvd/storage";


export function ProductCreateTipsArea({className}: IProductCreateFormProps) {
    const tips = [
        'Name must be capitalized',
        'Brief should be written briefly, enough to attract customers',
        'Version should be number',
        'Thumbnail should have ratio of 3/2'
    ];
    const renderTips = (tip: string) => (
        // make bold first word of each tip
        <Typography
            variant={'paragraph'}
            className={'text-grvd-theme-sys-dark-primary break-words w-[20em]'}
        >
            <span className={'font-bold'}>{tip.split(' ')[0]}</span> {tip.split(' ').slice(1).join(' ')}
        </Typography>
    );
    return (
        <div className={twJoin(
            'flex flex-row items-center gap-4 rounded-lg',
            'bg-grvd-theme-sys-dark-surface-container-low',
            'p-4 w-fit min-w-fit h-full',
            'relative overflow-hidden',
            className
        )}>
            <div className={twJoin(
                'rounded-[32px]',
                'w-[100%] h-[90%]',
                'bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(4,_29,_255,_0.25)_3.5%,_rgba(26,_93,_205,_0.25)_72.5%)]',
                'filter blur-[150px] -z-10',

                'absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2',
            )}/>
            {/*<div className={'w-[300px]'}>*/}
            {/*    <img src="/assets/product_card_preview.png" alt="ProductPage Preview"*/}
            {/*         className={'w-full h-auto'}*/}
            {/*    />*/}
            {/*</div>*/}

            <div>
                <Label
                    border
                    backgroundColor={'rgba(255,255,255,0.1)'}
                    color={'rgb(255,255,255)'}
                    className={'text-sm'}
                >
                    Create quickly
                </Label>
                <Typography
                    variant={'h5'}
                    className={'text-grvd-theme-sys-dark-primary font-bold text-3xl'}
                >
                    Tips for <br/> product information
                </Typography>
                <div className={twJoin(
                    'flex flex-col gap-4',
                )}>
                    {tips.map(renderTips)}
                </div>
            </div>
        </div>
    );
}


export function ProductCreateForm() {
    const merchant = useMerchant();
    const state = useSelector((state: RootState) => state.state.state);

    const [open, setOpen] = React.useState(false);
    const [fileThumbnail, setFileThumbnail] = React.useState<File | null>(null);
    const [mediaFromSpline, setMediaFromSpline] = React.useState<TMediaFromSpline | null>();
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [label, setLabel] = React.useState('');
    const [version, setVersion] = React.useState('');
    const [brief, setBrief] = React.useState('');

    const MAX_FILE_THUMBNAIL_SIZE = 300 * 1024;

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isSubmitSuccessful
        },
    } = useForm<TProductCreateForm>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            name,
            label,
            price,
            version,
            brief
        },
        criteriaMode: 'firstError',
    });
    const onSubmit: SubmitHandler<TProductCreateForm> = async (data) => {
        const reader = new FileReader();
        if (merchant && fileThumbnail) {
            reader.readAsArrayBuffer(fileThumbnail);
            reader.onload = async function (e: ProgressEvent<FileReader>) {
                if (reader.result instanceof ArrayBuffer) {
                    const arrayBuffer = reader.result;
                    try {
                        const response =
                            await axios
                                .post<any, any, TProduct>(`${config.server.url}/products`, {
                                    name: data.name,
                                    merchantId: merchant?.id as string,
                                    price: data.price,
                                    highlightLabel: data.label,
                                    version: data.version,
                                    brief: data.brief,
                                    thumbnail2D: {
                                        data: encode(arrayBuffer),
                                    },
                                    features: [],
                                    mediaFromSpline: {
                                        data: data.mediaFromSpline?.data || data.mediaFromSpline,
                                    },
                                }, {
                                    withCredentials: true
                                })
                                .then(async (response) => {
                                    await new Promise((resolve) => setTimeout(resolve, 2000));
                                    window.location.reload();
                                })
                                .catch((err) => console.log(err))

                        console.log(response);
                    } catch (err) {
                        console.log(err);
                    }
                }
            };
        }
    };

    const inputItems: Record<string, TInput> = {
        name: {
            title: 'Name',
            register: register('name', {
                required: 'Name is required',
                onChange: (e) => setName(e.target.value),
                minLength: {
                    value: 1,
                    message: 'Name should be more than 1 characters'
                },
                maxLength: {
                    value: 20,
                    message: 'Name should be less than 20 characters'
                }
            }),
        },
        price: {
            title: 'Price',
            register: register('price', {
                required: false,
                onChange: (e) => setPrice(e.target.value),
            }),
        },
        label: {
            title: 'Label',
            register: register('label', {
                required: false,
                onChange: (e) => setLabel(e.target.value),
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
                required: 'Brief is required. You should write something about your product',
                onChange: (e) => setBrief(e.target.value),
                maxLength: {
                    value: 100,
                    message: 'Brief should be less than 100 characters'
                }
            }),
        },
        fileThumbnail: {
            title: 'Thumbnail',
            register: register('fileThumbnail', {
                required: false,
                onChange: (e) => setFileThumbnail(e.target.files[0]),
                validate: (files: any) => {
                    if (files[0]?.size > MAX_FILE_THUMBNAIL_SIZE) {
                        return 'File size should be less than 300KB';
                    }
                    return true;
                }
            }),
        },
        mediaFromSpline: {
            title: '3D Model',
            register: register('mediaFromSpline', {
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
    }

    const handleOpen = () => setOpen(!open);
    if (!state.isAuthenticated) return null;
    return (
        <>
            <Button colorcustom={'primary'} sizecustom={'lg'} onClick={handleOpen}>+ Create Ad</Button>
            <Dialog
                size="md"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none flex !min-w-fit !min-h-fit"
            >
                <DialogBody
                    className={twJoin(
                        'bg-grvd-theme-sys-dark-surface-container-low backdrop-blur-[120px]',
                        'rounded-lg p-8 w-full',
                        'relative overflow-hidden',
                    )}
                >
                    <div>
                        <div className={twJoin(
                            'bg-[#0092E4] blur-[75px] w-[180px] h-[180px] rounded-full',
                            'absolute top-0 left-0 -z-10',
                        )}/>
                        <div className={twJoin(
                            'bg-[#0E50FA] blur-[125px] w-[300px] h-[300px] rounded-full',
                            'absolute top-0 left-0 -z-10',
                        )}/>
                        <div className={twJoin(
                            'bg-[#003ACF] blur-[100px] w-[200px] h-[200px] rounded-full',
                            'absolute bottom-0 right-0 -z-10',
                        )}/>
                    </div>
                    <div className={twJoin(
                        'z-20',
                        'flex flex-row justify-between gap-4 items-center',
                        'w-full h-full'
                    )}>
                        <ProductCreateTipsArea className={twJoin(
                            'z-20',
                        )}/>
                        <form
                            className={twJoin(
                                'w-full min-w-fit h-full',
                                'flex flex-col justify-between gap-4 z-20',
                            )}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <Typography
                                    variant={'h5'}
                                    className={'text-grvd-theme-sys-dark-primary font-bold flex flex-row gap-4 items-center'}
                                >
                                    <RiAdvertisementFill size={24}/>
                                    Create Product Advertisement
                                </Typography>
                                <Typography
                                    variant={'paragraph'}
                                    className={'text-grvd-theme-sys-dark-on-primary-variant'}
                                >
                                    Create product with some information
                                </Typography>
                            </div>
                            <div className={twJoin(
                                'grid grid-cols-2 grid-flow-row gap-4',
                            )}>
                                <Input
                                    containerProps={{
                                        className: 'row-start-1 col-span-full'
                                    }}
                                    placeholder={inputItems.name.title}
                                    {...inputItems.name.register}
                                />
                                <Input
                                    containerProps={{
                                        className: 'row-start-2 col-span-full'
                                    }}
                                    placeholder={inputItems.label.title}
                                    {...inputItems.label.register}
                                />
                                <Input
                                    containerProps={{
                                        className: 'col-start-1 col-span-1'
                                    }}
                                    placeholder={inputItems.version.title}
                                    {...inputItems.version.register}
                                />
                                <Input
                                    containerProps={{
                                        className: 'col-start-2 col-span-1'
                                    }}
                                    placeholder={inputItems.price.title}
                                    {...inputItems.price.register}
                                />
                                <Textarea
                                    containerProps={{
                                        className: 'col-span-full'
                                    }}
                                    placeholder={inputItems.brief.title}
                                    {...inputItems.brief.register}
                                />
                            </div>
                            <InputTypeFile
                                type={'file'}
                                title={inputItems.fileThumbnail.title}
                                listaccept={'JPEG, JPG, PNG'}
                                accept={".jpeg, .png, .jpg"}
                                multiple={false}
                                id={'file_thumbnail'}
                                file={fileThumbnail}
                                {...inputItems.fileThumbnail.register}
                            />
                            <div className={'flex flex-col gap-2'}>
                                <Input
                                    type={'url'}
                                    title={inputItems.mediaFromSpline.title}
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
                                    {...inputItems.mediaFromSpline.register}
                                />
                                <Typography
                                    variant={'paragraph'}
                                    className={'text-grvd-theme-sys-dark-on-primary-variant'}
                                >
                                    Graviad supports embedding 3D canvas from <span
                                    className={'font-bold'}>Spline</span>
                                </Typography>
                                {Object.entries(errors).length > 0 && <div
                                    className={twJoin(
                                        'flex flex-col gap-4',
                                        'rounded-lg p-4',
                                        'border-l-2 border-grvd-theme-sys-dark-error',
                                        'bg-gradient-to-r from-grvd-theme-sys-dark-error/25 to-grvd-theme-sys-dark-surface-container-high/6',
                                        'backdrop-blur-[50px]'
                                    )}
                                >
                                    {Object.entries(errors).slice(0, 3).map(([key, value]) => (
                                        <Typography
                                            variant={'paragraph'}
                                            className={'text-red-500 flex flex-row items-center gap-2'}
                                            key={key}
                                        >
                                            <CgDanger size={20}/>
                                            {value.message}
                                        </Typography>
                                    ))}
                                </div>}
                            </div>
                            <div className={'flex flex-row gap-8'}>
                                <Button
                                    colorcustom={'secondary'}
                                    sizecustom={'lg'}
                                    className={'w-full'}
                                    onClick={handleOpen}
                                >
                                    Cancel
                                </Button>
                                <ButtonWithLoading
                                    colorcustom={'primary'}
                                    sizecustom={'lg'}
                                    className={'w-full'}
                                    type={'submit'}
                                    isloading={isSubmitting}
                                    isdone={isSubmitSuccessful}
                                    label={
                                        {
                                            labelDefault: 'Create',
                                            labelLoading: 'Creating',
                                            labelDone: 'Created'
                                        }
                                    }
                                >
                                    Create
                                </ButtonWithLoading>
                            </div>
                        </form>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}
