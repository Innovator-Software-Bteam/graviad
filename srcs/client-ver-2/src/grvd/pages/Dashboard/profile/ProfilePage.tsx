import {IPageProps} from "grvd/pages/types";
import {twJoin} from "tailwind-merge";
import {ProfileDetailForEdit, ProfileDetailForPreview} from "grvd/molecules";
import {Button} from "grvd/components";
import {TiEye} from "react-icons/ti";
import {
    EditableContext,
    MerchantContext,
    ProfileContext,
    useEditable,
    useMerchant,
    UserContext,
    useUser
} from "grvd/contexts";
import {MdModeEditOutline} from "react-icons/md";
import React, {useEffect} from "react";
import {Route, useLocation, useParams} from "react-router-dom";
import {TMerchant, TProfile, TUser} from "grvd";
import axios from "axios";
import config from "../../../../config";
import {PiExportBold} from "react-icons/pi";
import * as htmlToImage from 'html-to-image';
import fileDownload from 'js-file-download';
import {ProfileExportDialog} from "grvd/molecules/User/ProfileExportDialog";

export function ProfilePageToolbar() {
    const {isEditable, setEditable} = useEditable();
    const {id} = useParams();
    const merchant = useMerchant();
    const user = useUser();
    const handleSwapState = () => {
        setEditable(!isEditable);
    };
    const handleExportProfile = () => {
        const node = document.getElementById('profile-card-' + merchant?.id);
        if (!node) return;
        htmlToImage.toBlob(node, {
            quality: 1,
            height: node.scrollHeight,
            width: node.scrollWidth,
        })
            .then(function (blob) {
                if (!blob) return;
                fileDownload(blob, 'Profile Card.png')
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }
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
            <ProfileExportDialog/>
            {(!isEditable && id === user?.merchant?.id) &&
                <Button
                    colorcustom={'tertiary'}
                    className={twJoin(
                        'shadow-none border-none',
                        'bg-grvd-theme-sys-dark-quaternary',
                        'rounded-full p-1 w-fit h-fit',
                        '[box-shadow:0px_0px_0px_5px_rgba(246,_110,_249,_0.25)]',
                        'z-50'
                    )}
                    onClick={handleSwapState}
                >
                    <MdModeEditOutline size={32} color={'#DF9BFF'}/>
                </Button>
            }
            {(isEditable && id === user?.merchant?.id) &&
                <Button
                    colorcustom={'tertiary'}
                    className={twJoin(
                        'shadow-none border-none',
                        'bg-grvd-theme-sys-dark-tertiary',
                        'rounded-full p-1 w-fit h-fit',
                        '[box-shadow:0px_0px_0px_5px_rgba(13,_80,_253,_0.25)]',
                        'z-50'
                    )}
                    onClick={handleSwapState}
                >
                    <TiEye size={32} color={'#9BDBFF'}/>
                </Button>
            }
        </header>
    );
}

export interface IProfilePageMainProps extends React.ComponentProps<'div'> {

}

export function ProfilePageMain({className}: IProfilePageMainProps) {
    const {isEditable} = useEditable();
    const {id} = useParams();
    const user = useUser();
    return (
        <div className={twJoin(
            'relative w-full h-full',
            className
        )}>
            {(isEditable && user?.merchant?.id === id) && <ProfileDetailForEdit/>}
            {(!isEditable && user?.merchant?.id === id) && <ProfileDetailForPreview/>}
            {user?.merchant?.id !== id && <ProfileDetailForPreview/>}
        </div>
    )

}

export function ProfilePage({className, ...props}: IPageProps) {
    const {id} = useParams();
    const location = useLocation();
    const forEmbed = new URLSearchParams(location.search).get('forEmbed') || 'false';

    const [user, setUser] = React.useState<TUser | undefined>(undefined);
    const [merchant, setMerchant] = React.useState<TMerchant | undefined>(undefined);
    const [editable, setEditable] = React.useState(() => {
        const storedEditable = localStorage.getItem("editable_profile");
        return storedEditable ? JSON.parse(storedEditable) : false;
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
            });
    };
    const loadUser = () => {
        if (!merchant?.email) return;
        axios
            .get(`${config.server.url}/users/email/${merchant?.email}`, {
                withCredentials: true,
                params: {
                    relations: ['profile'],
                    where: {
                        email: merchant?.email
                    }
                }
            })
            .then((res) => {
                setUser({
                    ...res.data,
                    profile: res.data.profile.data,
                });
            });
    }
    React.useEffect(() => {
        localStorage.setItem("editable_profile", JSON.stringify(editable));
    }, [editable]);
    React.useEffect(() => {
        loadMerchant();
    }, []);
    React.useEffect(() => {
        loadUser();
    }, [merchant]);

    return (
        <EditableContext.Provider value={{isEditable: editable, setEditable}}>
            <MerchantContext.Provider value={merchant}>
                <ProfileContext.Provider value={user?.profile}>
                    <div className={'w-full h-full flex flex-col items-center relative'}>
                        {forEmbed === 'false' && <ProfilePageToolbar/>}
                        <ProfilePageMain className={'w-full'}/>
                    </div>
                </ProfileContext.Provider>
            </MerchantContext.Provider>
        </EditableContext.Provider>
    );

}