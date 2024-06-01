import {Dialog, DialogBody, Typography} from "@material-tailwind/react";
import React from "react";
import {Button, Input, InputTypeFile, Label, Textarea} from "grvd/components";
import {twJoin} from "tailwind-merge";
import {SubmitHandler, useForm} from "react-hook-form";
import {RiAdvertisementFill} from "react-icons/ri";
import axios from "axios";
import config from "../../../config";
import {encode} from "base64-arraybuffer";
import {useMerchant} from "grvd/pages/Dashboard";
import {TProduct} from "grvd";
import {IProductCreateFormProps, TInput, TProductCreateForm} from "grvd/molecules/Product";


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
                'bg-[radial-gradient(50%_50%_at_50%_50%,_#FF06E6_12.21%,_rgba(160,_4,_255,_0.25)_47%,_rgba(9,_4,_255,_0.25)_72.5%)]',
                'filter blur-[150px] -z-10',

                'absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2',
            )}/>
            <div className={'w-[300px]'}>
                <img src="/assets/product_card_preview.png" alt="Product Preview"
                     className={'w-full h-auto'}
                />
            </div>

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

    const [open, setOpen] = React.useState(false);
    const [fileThumbnail, setFileThumbnail] = React.useState<File | null>(null);
    const [fileModel, setFileModel] = React.useState<File | null>(null);
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [label, setLabel] = React.useState('');
    const [version, setVersion] = React.useState('');
    const [brief, setBrief] = React.useState('');

    const MAX_FILE_THUMBNAIL_SIZE = 300 * 200 * 8 / 8 / 1024;

    const {
        register,
        handleSubmit,
        formState: {errors}
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
    const onSubmit: SubmitHandler<TProductCreateForm> = (data) => {
        console.log('data', data);
        const reader = new FileReader();
        if (merchant && fileThumbnail) {
            reader.readAsArrayBuffer(fileThumbnail);
            reader.onload = async function (e: ProgressEvent<FileReader>) {
                if (reader.result instanceof ArrayBuffer) {
                    const arrayBuffer = reader.result;
                    try {
                        const response =
                            await axios
                                .post<any, any, TProduct>(config.server.url + '/products', {
                                    name: data.name,
                                    merchantId: merchant?.id,
                                    price: data.price,
                                    highlightLabel: data.label,
                                    version: data.version,
                                    brief: data.brief,
                                    thumbnail2D: {
                                        data: encode(arrayBuffer),
                                    },
                                    features: []
                                }, {
                                    withCredentials: true
                                })
                                .then((response) => {
                                    console.log(response);
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
                required: 'This field is required',
                onChange: (e) => setName(e.target.value),
            }),
        },
        price: {
            title: 'Price',
            register: register('price', {
                required: 'This field is required',
                onChange: (e) => setPrice(e.target.value),
            }),
        },
        label: {
            title: 'Label',
            register: register('label', {
                required: 'This field is required',
                onChange: (e) => setLabel(e.target.value),
            }),
        },
        version: {
            title: 'Version',
            register: register('version', {
                required: 'This field is required',
                onChange: (e) => setVersion(e.target.value),
            }),
        },
        brief: {
            title: 'Brief',
            register: register('brief', {
                required: 'This field is required',
                onChange: (e) => setBrief(e.target.value),
            }),
        },
        fileThumbnail: {
            title: 'Thumbnail',
            register: register('fileThumbnail', {
                onChange: (e) => setFileThumbnail(e.target.files[0]),
                // validate: {
                //     size: (fileThumbnail: File) => fileThumbnail.size <= MAX_FILE_THUMBNAIL_SIZE || 'File size must be smaller than 300x200px',
                // }
            }),
        },
    }

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Button colorCustom={'primary'} sizeCustom={'lg'} onClick={handleOpen}>+ Create Ad</Button>
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
                            'bg-[#9D1E98] blur-[75px] w-[180px] h-[180px] rounded-full',
                            'absolute top-0 left-0 z-10',
                        )}/>
                        <div className={twJoin(
                            'bg-[#0E50FA] blur-[125px] w-[300px] h-[300px] rounded-full',
                            'absolute top-0 left-0 z-10',
                        )}/>
                        <div className={twJoin(
                            'bg-[#651E9D] blur-[100px] w-[200px] h-[200px] rounded-full',
                            'absolute bottom-0 right-0 z-10',
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
                            <div className={twJoin(
                                'flex flex-row justify-between gap-4',
                                'w-full h-full'
                            )}>
                                <InputTypeFile
                                    id={'file_model'}
                                    title={'Upload 3D'}
                                    color={'#0095FF'}
                                    listaccept={'GTLB/GLB, STL'}
                                />
                                <InputTypeFile
                                    type={'file'}
                                    title={inputItems.fileThumbnail.title}
                                    color={'#EB00FF'}
                                    listaccept={'JPEG, JPG, PNG'}
                                    accept={".jpeg, .png, .jpg"}
                                    multiple={false}
                                    id={'file_thumbnail'}
                                    file={fileThumbnail}
                                    {...inputItems.fileThumbnail.register}
                                />
                            </div>
                            <div className={'flex flex-row gap-8'}>
                                <Button colorCustom={'secondary'} sizeCustom={'lg'} className={'w-full'}>Cancel</Button>
                                <Button colorCustom={'primary'} sizeCustom={'lg'} className={'w-full'}
                                        type={'submit'}>Create</Button>
                            </div>
                        </form>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}
