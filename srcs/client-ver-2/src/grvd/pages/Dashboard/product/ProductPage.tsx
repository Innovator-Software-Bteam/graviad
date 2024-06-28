import {ProductCreateForm, ProductDetailForPreview} from "grvd/molecules/Product";
import {useLocation, useParams} from "react-router-dom";
import {ProductDetailForEdit} from "grvd/molecules/Product/ProductDetailForEdit";
import {twJoin} from "tailwind-merge";
import React, {useContext, useEffect} from "react";
import {TProduct} from "grvd";
import axios from "axios";
import config from "../../../../config";
import {ProductContext, useEditable, useMerchant, useUser, useProduct} from "grvd/contexts";
import {ProductExportDialog} from "grvd/molecules/Product/ProductExportDialog";
import {SwapViewMode, TViewMode, useViewMode, ViewModeContext} from "grvd/organisms";
import {useDialog} from "grvd/organisms";
import {Button, ButtonWithLoading} from "grvd/components/Button";
import {ToolbarContext, TToolbarContext, useToolbar} from "grvd/pages";
import {useMedia} from "grvd/reponsive";
import { TiCreditCard } from "react-icons/ti";

export function ProductPageToolbar() {
    const {condition} = useViewMode();
    const {buttonSave} = useToolbar();
    const {isMobile} = useMedia();
    if(isMobile) return (
        <div
            className={twJoin(
                'fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50',
                'max-w-[95%] w-fit p-4 mb-4 rounded-full',
                'bg-grvd-theme-sys-dark-surface-container',
                'flex flex-row justify-between gap-4 items-center',
            )}
        >
            <ProductExportDialog className={'rounded-full'}/>
            <ButtonWithLoading
                label={buttonSave.label}
                isloading={buttonSave.isloading}
                isdone={buttonSave.isdone}
                iserror={buttonSave.iserror}
                onClick={buttonSave.onClick}
                colorcustom={'primary'}
                sizecustom={'lg'}
                className={'z-50 rounded-full'}
                form={'product-form'}
                type={'submit'}
            >
                Save
            </ButtonWithLoading>
            <ProductCreateForm/>
            <Button
                colorcustom={'secondary'}
                sizecustom={'lg'}
                className={'rounded-full'}
                onClick={()=>{
                    window.location.href = '/dashboard/templates';
                }}
            >
                <TiCreditCard size={24}/>
            </Button>
            {condition?.edit && <SwapViewMode/>}
        </div>
    );
    return (
        <header
            className={twJoin(
                'w-full p-4',
                'bg-gradient-to-b from-grvd-theme-sys-dark-surface-container-lower from-25% to-transparent to-80% border-none',
                'flex flex-row justify-end gap-4 items-center',
                'sticky top-0 z-50',
                'transition-all duration-300 ease-in-out',
                'relative'
            )}
        >
            <div className={twJoin(
                'absolute top-0 left-1/2 -translate-x-1/2',
                'w-full h-full',
                'bg-transparent backdrop-blur-[5px]',
            )}/>
            <ProductExportDialog/>
            <ButtonWithLoading
                label={buttonSave.label}
                isloading={buttonSave.isloading}
                isdone={buttonSave.isdone}
                iserror={buttonSave.iserror}
                onClick={buttonSave.onClick}
                colorcustom={'primary'}
                sizecustom={'lg'}
                className={'z-50'}
                form={'product-form'}
                type={'submit'}
            >
                Save
            </ButtonWithLoading>
            {condition?.edit && <SwapViewMode/>}
        </header>
    );
}

export interface IProductPageProps extends React.ComponentProps<'div'> {

}

export function ProductPageMain({className}: IProductPageProps) {
    const location = useLocation();
    const viewMode = location.state?.viewMode;
    const product = useContext(ProductContext);
    return (
        <ProductContext.Provider value={product}>
            <div className={twJoin(
                'w-full',
                className
            )}>
                {(viewMode === 'edit') && <ProductDetailForEdit/>}
                {(viewMode === 'preview') && <ProductDetailForPreview/>}
                {(!viewMode) && <ProductDetailForPreview/>}
            </div>
        </ProductContext.Provider>
    )
}

export function ProductPage() {
    const {id} = useParams();
    const user = useUser();
    const location = useLocation();
    const [product, setProduct] = React.useState<TProduct>();
    const [viewMode, setViewMode] = React.useState<TViewMode>('preview');
    const condition = {
        preview: true,
        edit: user?.merchant?.id === product?.merchant?.id,
    };
    const [buttonSave, setButtonSave] = React.useState<TToolbarContext['buttonSave']>({
        colorcustom: 'primary',
        sizecustom: 'lg',
        children: 'Save',
        className: '',
        isloading: false,
        isdone: false,
        iserror: false,
        label: {
            labelError: 'Error',
            labelDone: 'Done',
            labelLoading: 'Loading',
            labelDefault: 'Save',
        },
    });
    const {open} = useDialog();
    const loadProduct = async () => {
        if (!id) return;
        await axios
            .get(`${config.server.url}/products/${id}`, {
                withCredentials: true,
                params: {
                    relations: ['merchant', 'mediaFromSpline', 'features'],
                }
            })
            .then((res) => {
                setProduct(res.data);
            })
            .catch(err => {
                open('Something went wrong. Please try again!');
                console.log(err);
            });
    };
    useEffect(() => {
        loadProduct().then().catch();
    }, []);
    return (
        <ProductContext.Provider value={product}>
            <ViewModeContext.Provider value={{viewMode, setViewMode, condition}}>
                <ToolbarContext.Provider value={{buttonSave, setButtonSave}}>
                <div className={'w-full min-w-fit h-full min-h-fit relative'}>
                    {/*<div className={twJoin(*/}
                    {/*    'bg-[radial-gradient(41.69%_43.44%_at_51.96%_21.43%,rgba(0,177,253,0.50)_0%,rgba(0,86,215,0.50)_100%)] blur-[200px]',*/}
                    {/*    'rounded-full',*/}
                    {/*    'w-1/2 h-[30vh] absolute top-0 left-1/2 transform -translate-x-1/2 -z-20',*/}
                    {/*)}/>*/}
                    <ProductPageToolbar/>
                    <ProductPageMain/>
                </div>
                </ToolbarContext.Provider>
            </ViewModeContext.Provider>
        </ProductContext.Provider>
    );
}