import {IPageProps} from "grvd/pages/types";
import {twJoin} from "tailwind-merge";
import {ProfileDetailForEdit, ProfileDetailForPreview} from "grvd/molecules";
import {Button} from "grvd/components";
import {TiEye} from "react-icons/ti";
import {EditableContext, MerchantContext, ProfileContext, useEditable, UserContext} from "grvd/contexts";
import {MdModeEditOutline} from "react-icons/md";
import React from "react";
import {Route, useLocation, useParams} from "react-router-dom";
import {TMerchant, TProfile, TUser} from "grvd";
import axios from "axios";
import config from "../../../../config";

export function ProfilePageToolbar() {
    const {isEditable, setEditable} = useEditable();
    const handleSwapState = () => {
        setEditable(!isEditable);
    }
    return (
        <header
            className={twJoin(
                'w-full p-4',
                'bg-transparent border-none backdrop-blur-[50px]',
                'flex flex-row justify-end',
                'sticky top-0 z-10',
                'transition-all duration-300 ease-in-out',
            )}
        >
            {!isEditable ?
                <Button
                    colorcustom={'tertiary'}
                    className={twJoin(
                        'shadow-none border-none',
                        'bg-grvd-theme-sys-dark-quaternary',
                        'rounded-full p-1',
                        '[box-shadow:0px_0px_0px_5px_rgba(246,_110,_249,_0.25)]',
                    )}
                    onClick={handleSwapState}
                >
                    <MdModeEditOutline size={32} color={'#DF9BFF'}/>
                </Button>
                :
                <Button
                    colorcustom={'tertiary'}
                    className={twJoin(
                        'shadow-none border-none',
                        'bg-grvd-theme-sys-dark-tertiary',
                        'rounded-full p-1',
                        '[box-shadow:0px_0px_0px_5px_rgba(13,_80,_253,_0.25)]',
                    )}
                    onClick={handleSwapState}
                >
                    <TiEye size={32} color={'#9BDBFF'}/>
                </Button>
            }
        </header>
    );
}

export function ProfilePageMain() {
    const {isEditable} = useEditable();
    return (
        <div>
            {isEditable ?
                <ProfileDetailForEdit/>
                :
                <ProfileDetailForPreview/>
            }
        </div>
    )

}

export function ProfilePage({className, ...props}: IPageProps) {
    //get id of route params of current route
    const {id} = useParams();
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
                    <ProfilePageToolbar/>
                    <ProfilePageMain/>
                    <img
                        src={'/assets/profile_view_effect.png'}
                        alt={'ProfilePage view effect'}
                        className={twJoin(
                            'absolute top-[35%] left-0',
                            'w-full h-full object-cover',
                            'z-[-1]'
                        )}
                    />
                </div>
                </ProfileContext.Provider>
            </MerchantContext.Provider>
        </EditableContext.Provider>
    );

}