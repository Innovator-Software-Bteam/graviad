import {IPageProps} from "grvd/pages/types";
import {twJoin} from "tailwind-merge";
import {ProfileDetailForEdit, ProfileDetailForPreview} from "grvd/molecules";
import {Button, ButtonWithLoading, IButtonWithLoadingProps} from "grvd/components";
import {TiCreditCard, TiEye} from "react-icons/ti";
import {
    EditableContext,
    MerchantContext,
    ProfileContext,
    useEditable,
    useMerchant,
    UserContext,
    useUser
} from "grvd/contexts";
import {MdModeEditOutline, MdOutlineAddCard} from "react-icons/md";
import React, {MouseEvent, useEffect, useRef} from "react";
import {Navigate, Route, useLocation, useNavigate, useParams} from "react-router-dom";
import {TMerchant, TProduct, TProfile, TUser} from "grvd";
import axios from "axios";
import config from "../../../../config";
import * as htmlToImage from 'html-to-image';
import fileDownload from 'js-file-download';
import {ProfileExportDialog} from "grvd/molecules/User/ProfileExportDialog";
import {ProductExportDialog} from "grvd/molecules/Product/ProductExportDialog";
import {useMedia} from "grvd/reponsive";
import {SwapViewMode, TViewMode, useViewMode, ViewModeContext} from "grvd/organisms";


export type TToolbarContext = {
    buttonSave: IButtonWithLoadingProps;
    setButtonSave?: (props: IButtonWithLoadingProps) => void;
}
export const ToolbarContext = React.createContext<TToolbarContext>({
    buttonSave: {
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
    }

});

export function useToolbar() {
    return React.useContext(ToolbarContext);
}

export function ProfilePageToolbar() {
    const {condition} = useViewMode();
    const {isMobile} = useMedia();
    const {buttonSave} = useToolbar();

    if (isMobile) return (
        <div
            className={twJoin(
                'fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50',
                'max-w-[95%] w-fit p-4 mb-4 rounded-full',
                'bg-grvd-theme-sys-dark-surface-container',
                'flex flex-row justify-between gap-4 items-center',
            )}
        >
            {
                condition?.edit
                &&
                <>
                    <ProfileExportDialog className={'rounded-full'}/>
                    <ButtonWithLoading
                        label={buttonSave.label}
                        isloading={buttonSave.isloading}
                        isdone={buttonSave.isdone}
                        iserror={buttonSave.iserror}
                        onClick={buttonSave.onClick}
                        colorcustom={'primary'}
                        sizecustom={'lg'}
                        className={'z-50 rounded-full'}
                        form={'profile-form'}
                        type={'submit'}
                    >
                        Save
                    </ButtonWithLoading>
                </>
            }
            <Button
                colorcustom={'secondary'}
                sizecustom={'lg'}
                className={'rounded-full'}
                onClick={() => {
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
            {
                condition?.edit
                &&
                <>
                    <div className={twJoin(
                        'absolute top-0 left-1/2 -translate-x-1/2',
                        'w-full h-full',
                        'bg-transparent backdrop-blur-[5px]',
                    )}/>
                    <ProfileExportDialog/>
                    <ButtonWithLoading
                        label={buttonSave.label}
                        isloading={buttonSave.isloading}
                        isdone={buttonSave.isdone}
                        iserror={buttonSave.iserror}
                        onClick={buttonSave.onClick}
                        colorcustom={'primary'}
                        sizecustom={'lg'}
                        className={'z-50'}
                        form={'profile-form'}
                        type={'submit'}
                    >
                        Save
                    </ButtonWithLoading>
                    <SwapViewMode/>
                </>
            }
        </header>
    );
}

export interface IProfilePageMainProps extends React.ComponentProps<'div'> {

}

export function ProfilePageMain({className}: IProfilePageMainProps) {
    const location = useLocation();
    const viewMode = location.state?.viewMode;
    return (
        <div className={twJoin(
            'relative w-full h-full',
            className
        )}>
            {(viewMode === 'edit') && <ProfileDetailForEdit/>}
            {(viewMode === 'preview') && <ProfileDetailForPreview/>}
            {(!viewMode) && <ProfileDetailForPreview/>}
        </div>
    );

}

export function ProfilePage({className, ...props}: IPageProps) {
    const {id} = useParams();
    const user = useUser();
    const location = useLocation();
    const navigate = useNavigate();
    const forEmbed = new URLSearchParams(location.search).get('forEmbed') || 'false';
    const [merchant, setMerchant] = React.useState<TMerchant | undefined>(undefined);
    const [viewMode, setViewMode] = React.useState<TViewMode>('preview');
    const [editable, setEditable] = React.useState(() => {
        const storedEditable = localStorage.getItem("editable_profile");
        return storedEditable ? JSON.parse(storedEditable) : false;
    });
    const condition = {
        preview: true,
        edit: user?.merchant?.id === merchant?.id,
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
    const loadMerchant = () => {
        if (!id) return;
        axios
            .get(`${config.server.url}/merchants/${id}`, {
                withCredentials: true,
                params: {
                    relations: ['avatar', 'socialLinks'],
                }
            })
            .then((res) => {
                setMerchant(res.data);
            })
            .catch((err) => {
                navigate('404', {replace: true})
            });
    };
    React.useEffect(() => {
        localStorage.setItem("editable_profile", JSON.stringify(editable));
    }, [editable]);
    React.useEffect(() => {
        loadMerchant();
    }, []);
    if (!id || id === 'undefined') return (
        <Navigate to={'/homepage/pricing'}/>
    );

    return (
        <MerchantContext.Provider value={merchant}>
            <ProfileContext.Provider value={user?.profile}>
                <ViewModeContext.Provider value={{viewMode, setViewMode, condition}}>
                    <ToolbarContext.Provider value={{buttonSave, setButtonSave}}>
                        <div className={'w-full h-full flex flex-col items-center relative'}>
                            {forEmbed === 'false' && <ProfilePageToolbar/>}
                            <ProfilePageMain className={'w-full'}/>
                        </div>
                    </ToolbarContext.Provider>
                </ViewModeContext.Provider>
            </ProfileContext.Provider>
        </MerchantContext.Provider>
    );

}