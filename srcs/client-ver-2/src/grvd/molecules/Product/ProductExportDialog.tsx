import React from "react";
import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Radio,
    Typography
} from "@material-tailwind/react";
import {Button, ButtonWithLoading, Select, SelectOption} from "grvd/components";
import {PiExportBold} from "react-icons/pi";
import {twJoin} from "tailwind-merge";
import {useParams} from "react-router-dom";
import * as htmlToImage from 'html-to-image';
import jsFileDownload from 'js-file-download';
import {ProductCard} from "grvd/molecules";
import {useProduct} from "grvd/contexts";
import ReactDOM from "react-dom/client";
import {useDialog} from "grvd/organisms";

export type TObjectExportType = 'product' | 'card';
export type TDataExportType = 'image' | 'url' | 'embed';
export const ObjectExportTypeContext = React.createContext({
    objectExportType: 'profile' as TObjectExportType,
    setObjectExportType: (type: any) => {
    }
});

export function useObjectExportType() {
    return React.useContext(ObjectExportTypeContext);
}

export const DataExportTypeContext = React.createContext({
    dataExportType: 'image' as TDataExportType,
    setDataExportType: (type: any) => {
    }
});

export function useDataExportType() {
    return React.useContext(DataExportTypeContext);
}

export interface IProfileExportDialogProps extends React.ComponentProps<'div'> {

}

export interface IProfileExportTypesAreaProps extends React.ComponentProps<'div'> {

}

export interface IObjectExportProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    type: TObjectExportType;
}

export interface IDataExportTypeProps {
    title: string;
    description: string;
    type: TDataExportType;
}

export function ProfileDataExportTypesArea(props: IProfileExportTypesAreaProps) {
    const {setDataExportType} = useDataExportType();
    const exportDataTypesItems: IDataExportTypeProps[] = [
        {
            title: 'Image',
            description: 'PNG, JPEG, GIF',
            type: 'image',
        },
        {
            title: 'URL',
            description: 'Graviad URL',
            type: 'url',
        },
        {
            title: 'Embed',
            description: 'Embed code',
            type: 'embed',
        }
    ];
    const renderDataExportTypes = (props: IDataExportTypeProps, key: any) => {
        return (
            <label htmlFor={'profile-export-type-' + key}>
                <div
                    className={twJoin(
                        'flex flex-col gap-4 items-start justify-center',
                        'p-4 rounded-lg',
                        'bg-grvd-theme-sys-dark-surface-container-high',
                        'w-[10em] aspect-[1/1]',
                        'cursor-pointer',
                        'transition-all duration-200 ease-in-out',
                    )}
                    onClick={() => {
                        setDataExportType(props.type);
                    }}
                    key={key}
                >
                    <Radio
                        defaultChecked={props.type === 'image'}
                        ripple={false}
                        name={'profile-export-type'}
                        id={'profile-export-type-' + key}
                        crossOrigin={''}
                        containerProps={{
                            className: 'w-fit h-fit p-0'
                        }}
                        iconProps={{
                            className: 'text-[#39ff14]'
                        }}
                    />
                    <Typography
                        variant={'lead'}
                        className={'text-grvd-theme-sys-dark-primary font-bold'}
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        variant={'small'}
                        className={'text-grvd-theme-sys-dark-on-primary-variant'}
                    >
                        {props.description}
                    </Typography>
                </div>
            </label>

        );
    }
    return (
        <div className={twJoin(
            'flex flex-row gap-4 items-start justify-start',
        )}>
            {
                exportDataTypesItems.map((item, index) => {
                    return renderDataExportTypes(item, index);
                })
            }
        </div>
    );
}

export interface IProfileExportObjectTypesAreaProps extends React.ComponentProps<'div'> {

}

export function ProfileObjectExportTypesArea(props: IProfileExportObjectTypesAreaProps) {
    const {onChange} = props;
    const {setObjectExportType} = useObjectExportType();
    const exportTypesItems: IObjectExportProps[] = [
        {
            title: 'Product',
            description: 'Export poster',
            type: 'product',
        },
        {
            title: 'Card',
            description: 'Card',
            type: 'card',
        }
    ];
    const renderObjectExportTypes = (props: IObjectExportProps, key: any) => {
        return (
            <div
                className={twJoin(
                    'flex flex-col gap-2 items-start justify-center',
                    'p-4 rounded-lg',
                    'bg-grvd-theme-sys-dark-surface-container-high',
                    'w-[10em] h-fit',
                    'cursor-pointer',
                    'transition-all duration-200 ease-in-out',
                )}
                onClick={() => {
                    setObjectExportType(props.type);
                    if (onChange) {
                        onChange(props.type as any);
                    }
                }}
                key={key}
            >
                <Typography
                    variant={'lead'}
                    className={'text-grvd-theme-sys-dark-primary font-medium'}
                >
                    {props.title}
                </Typography>
                <Typography
                    variant={'small'}
                    className={'text-grvd-theme-sys-dark-on-primary-variant'}
                >
                    {props.description}
                </Typography>
                {props.icon}
            </div>
        );
    };
    return (
        <div className={twJoin(
            'flex flex-row gap-4 items-start justify-between',
            'w-full'
        )}>
            {
                exportTypesItems.map((item, index) => {
                    return renderObjectExportTypes(item, index);
                })
            }
        </div>
    );
}

export function ProductExportDialog(props: IProfileExportDialogProps) {
    const {} = props;
    const {id} = useParams();
    const product = useProduct();
    const [isOpenExportDialog, setIsOpenExportDialog] = React.useState(false);
    const [isExporting, setIsExporting] = React.useState(false);
    const [isExported, setIsExported] = React.useState(false);
    const [error, setError] = React.useState<any>(null);
    const {
        open,
    } = useDialog();
    const [labelExportButton, setLabelExportButton] = React.useState<{
        labelDefault: string;
        labelDone: string;
        labelLoading: string;
        labelError?: string;
    }>({
        labelDefault: 'Export',
        labelDone: 'Exported',
        labelLoading: 'Exporting',
    });

    const [isOpenSelectionDialog, setIsOpenSelectionDialog] = React.useState(false);

    const [objectExportType, setObjectExportType] = React.useState<TObjectExportType>('product');
    const [dataExportType, setDataExportType] = React.useState<TDataExportType>('image');
    const resetExport = () => {
        setIsExporting(false);
        setIsExported(false);
        setError(null);
    }
    const qualityItems = [
        {
            title: 'Low',
            value: 0.5,
        },
        {
            title: 'Medium',
            value: 0.7,
        },
        {
            title: 'High',
            value: 1,
        }
    ];
    const [value, setValue] = React.useState(qualityItems[1].value);
    const handleExport = () => {
        setIsExporting(true);
        setIsExported(false);
        const getNode = () => {
            switch (objectExportType) {
                case 'product':
                    return document.getElementById('product-detail-for-preview' + id);
                case 'card':
                    const node = document.createElement('div');
                    const card = ReactDOM.createRoot(node);
                    card.render(<ProductCard product={product}/>);
                    return node;
                default:
                    return null;
            }
        }

        const node = getNode();

        if (!node) return;
        switch (dataExportType) {
            case "image":
                htmlToImage
                    .toBlob(node, {
                        quality: value,
                    })
                    .then(function (dataUrl) {
                        if (dataUrl) {
                            jsFileDownload(dataUrl, objectExportType, 'image/png');
                            setIsExported(true);
                        }
                    })
                    .catch((e) => {
                        open('Something went wrong. Please try again!', 'error');
                        setIsExported(false);
                        setError(e);
                    })
                    .finally(() => {
                        setIsExporting(false);
                    });
                break;
            case "url":
                setIsExporting(false);
                setIsExported(true);
                navigator.clipboard
                    .writeText(window.location.toString())
                    .then(() => {
                        setIsExported(true);
                    })
                    .catch((e) => {
                        setIsExported(false);
                        setError(e);
                    })
                    .finally(() => {
                        setIsExporting(false);
                    })
                break;
            case "embed":
                let iframe = document.createElement('iframe');
                const url = new URL(window.location.toString());
                url.searchParams.append('forEmbed', 'true');
                iframe.src = url.toString();
                iframe.src = url.toString();
                iframe.style.minWidth = node.scrollWidth + 'px';
                iframe.style.minHeight = node.scrollHeight + 'px';
                iframe.style.height = '100%';
                iframe.style.width = '100%';
                navigator.clipboard
                    .writeText(iframe.outerHTML)
                    .then(() => {
                        setIsExported(true);
                    })
                    .catch((e) => {
                        open('Something went wrong. Please try again!', 'error');
                        setIsExported(false);
                        setError(e);
                    })
                    .finally(() => {
                        setIsExporting(false);
                    })

        }
    };
    const handleOpenExportDialog = () => {
        setIsOpenExportDialog(!isOpenExportDialog);
        setIsOpenSelectionDialog(false);
    }
    const handleOpenSelectionDialog = () => {
        setIsOpenSelectionDialog(!isOpenSelectionDialog);
        setIsOpenExportDialog(false);
    }
    React.useEffect(() => {
        resetExport();
        switch (dataExportType) {
            case "image":
                setLabelExportButton({
                    labelDefault: 'Export',
                    labelDone: 'Exported',
                    labelLoading: 'Exporting',
                });
                break;
            case "url":
                setLabelExportButton({
                    labelDefault: 'Copy',
                    labelDone: 'Copied',
                    labelLoading: 'Copying',
                    labelError: error,
                });
                break;
            case "embed":
                setLabelExportButton({
                    labelDefault: 'Copy',
                    labelDone: 'Copied',
                    labelLoading: 'Copying',
                    labelError: error,
                });
                break;
        }
        console.log(error);
    }, [dataExportType]);
    return (
        <DataExportTypeContext.Provider value={{dataExportType, setDataExportType}}>
            <ObjectExportTypeContext.Provider value={{objectExportType, setObjectExportType}}>
                <Button
                    colorcustom={'secondary'}
                    sizecustom={'lg'}
                    className={twJoin(
                        'flex flex-row gap-2 items-center justify-center w-fit h-fit relative',
                        props.className
                    )}
                    onClick={handleOpenSelectionDialog}
                >
                    Export
                    <PiExportBold size={20}/>
                </Button>
                <Dialog
                    open={isOpenSelectionDialog}
                    handler={handleOpenSelectionDialog}
                    size={'xs'}
                    className={twJoin(
                        'bg-grvd-theme-sys-dark-surface-container-low',
                        'p-4',
                        'overflow-clip'
                    )}
                >
                    <DialogBody
                        className={'w-full flex flex-row items-start justify-between'}
                    >
                        <ProfileObjectExportTypesArea onChange={handleOpenExportDialog}/>
                    </DialogBody>
                </Dialog>

                <Dialog
                    open={isOpenExportDialog}
                    handler={handleOpenExportDialog}
                    size={'md'}
                    className={twJoin(
                        'bg-grvd-theme-sys-dark-surface-container-low',
                        'p-4',
                        'overflow-clip'
                    )}
                >
                    <div className={twJoin(
                        'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] aspect-[1/1] rounded-full',
                        'bg-[rgb(0,58,257)] blur-[150px]'
                    )}/>
                    <div className={twJoin(
                        'bg-[#7400CF]',
                        'w-50% aspect-[1/1] rounded-full',
                        'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20',
                    )}/>
                    <DialogHeader
                        className={twJoin(
                            'flex flex-col gap-2 items-start justify-start',
                        )}
                    >
                        <Typography
                            variant={'h4'}
                            className={'text-grvd-theme-sys-dark-primary font-bold z-50'}
                        >
                            Export {objectExportType}
                        </Typography>
                        <Typography
                            variant={'paragraph'}
                            className={'text-grvd-theme-sys-dark-on-primary-variant z-50'}
                        >
                            Export profile to image, or web, or embed code
                        </Typography>
                    </DialogHeader>
                    <DialogBody
                        className={twJoin(
                            'flex flex-col gap-4 items-start justify-start',
                        )}
                    >
                        <div
                            className={twJoin(
                                'flex flex-col gap-4 items-start justify-start',
                            )}
                        >
                            <Typography
                                variant={'h6'}
                                className={'text-grvd-theme-sys-dark-primary font-bold'}
                            >
                                Type
                            </Typography>
                            <ProfileDataExportTypesArea/>
                        </div>
                        {
                            dataExportType === 'image' &&
                            <div
                                className={twJoin(
                                    'mb-[120px]',
                                    'flex flex-col gap-4 items-start justify-start',
                                )}
                            >
                                <Typography
                                    variant={'h6'}
                                    className={'text-grvd-theme-sys-dark-primary font-bold'}
                                >
                                    Quality
                                </Typography>
                                <Select
                                    label={'Quality'}
                                    value={'Medium'}
                                    onChange={(value) => {
                                        setValue(value as any);
                                    }}
                                >
                                    {
                                        qualityItems.map((item, index) => {
                                            return (
                                                <SelectOption
                                                    key={index}
                                                    value={item.title}
                                                >{item.title}</SelectOption>
                                            );
                                        })
                                    }
                                </Select>
                            </div>
                        }
                    </DialogBody>
                    <DialogFooter>
                        <ButtonWithLoading
                            onClick={handleExport}
                            isloading={isExporting}
                            isdone={isExported}
                            sizecustom={'lg'}
                            className={'w-full'}
                            label={labelExportButton}
                        >
                            {labelExportButton.labelDefault}
                            <PiExportBold size={20}/>
                        </ButtonWithLoading>
                    </DialogFooter>
                </Dialog>
            </ObjectExportTypeContext.Provider>
        </DataExportTypeContext.Provider>
    );
}