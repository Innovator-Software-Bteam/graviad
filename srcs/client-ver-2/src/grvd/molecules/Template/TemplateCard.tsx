import React, {useEffect, useState} from "react";
import {useUser} from "grvd/contexts";
import {twJoin} from "tailwind-merge";
import {useTemplate} from "grvd/molecules/Template/TemplateContext";
import {Typography} from "@material-tailwind/react";
import {FaRegHeart} from "react-icons/fa6";
import {IoAdd, IoRemoveOutline} from "react-icons/io5";
import axios from "axios";
import config from "../../../config";
import {IoIosRemove} from "react-icons/io";
import {Button} from "grvd/components/Button";
import {useDialog} from "grvd/organisms";
import {ProtectedFeatureRequiredLogin} from "grvd/protected";

export interface ITemplateCardProps extends React.ComponentProps<'div'> {

}

export function TemplateCard(props: ITemplateCardProps) {
    const user = useUser();
    const merchant = user?.merchant;
    const template = useTemplate();

    useEffect(() => {
    }, [user]);
    return (
        <div
            key={template?.id}
            className={twJoin(
                "template-card",
                'flex flex-col gap-8 justify-center items-center',
                'p-4 w-full min-w-[300px] aspect-[1/1]'
            )}
        >
            <TemplateSample>
                {props.children}
            </TemplateSample>
            <TemplateCardMain/>
            <TemplateCardTool/>
        </div>
    );
}

export interface ITemplateSampleProps extends React.ComponentProps<'div'> {

}

export function TemplateSample(props: ITemplateSampleProps) {
    return (
        <div className={'w-full'}>
            {props.children}
        </div>
    );
}

export interface ITemplateCardToolProps extends React.ComponentProps<'div'> {

}

export type TInfoItem = {
    icon?: React.ReactNode;
    label: string;
}

export function TemplateCardTool(props: ITemplateCardToolProps) {
    const template = useTemplate();
    const user = useUser();
    const merchant = user?.merchant;
    const {open} = useDialog();
    const [templateIds, setTemplateIds] = useState<number []>([]);
    const [usingTemplateProfileCardId, setUsingTemplateProfileCardId] = useState<number | undefined>(undefined);
    const items: TInfoItem[] = [
        {
            icon: <FaRegHeart size={20}/>,
            label: template?.numberOfLikes?.toString() || '0'
        }
    ];

    const renderInfoItem = (item: TInfoItem, index: any) => {
        return (
            <Typography
                key={index}
                variant={'small'}
                className={twJoin(
                    'flex flex-row gap-2 items-center',
                    'text-grvd-theme-sys-dark-on-primary-variant font-medium',
                    'px-2 py-1'
                )}
            >
                {item.icon}
                {item.label}
            </Typography>
        );
    };
    const handleAddTemplate = async () => {
        axios
            .post(`${config.server.url}/merchants/${merchant?.id}/add-template/${template?.id}`, {}, {
                withCredentials: true
            })
            .then(res => {
                setTemplateIds([...templateIds, template?.id as any]);
            })
            .catch();
    };
    const handleRemoveTemplate = async () => {
        axios
            .post(`${config.server.url}/merchants/${merchant?.id}/remove-template/${template?.id}`, {}, {
                withCredentials: true
            })
            .then(res => {
                setTemplateIds(templateIds.filter(id => id !== template?.id));
            })
            .catch();
    };
    const handleUseTemplate = async () => {
        if(!merchant?.id) return;
        axios
            .patch(`${config.server.url}/merchants/${merchant?.id}`, {
                usingTemplateProfileCardId: template?.id
            }, {
                withCredentials: true
            })
            .then(res => {
                const merchant = res.data;
                setUsingTemplateProfileCardId(merchant.usingTemplateProfileCardId);
            })
            .catch(e=>{
                open(null, 'error');
                console.error(e);
            });
    };
    useEffect(() => {
        if (merchant?.templateIds) setTemplateIds(merchant.templateIds);
        if(merchant?.usingTemplateProfileCardId) setUsingTemplateProfileCardId(merchant.usingTemplateProfileCardId);
    }, [user]);
    useEffect(() => {

    }, [usingTemplateProfileCardId]);
    return (
        <div className={twJoin(
            'w-full',
            'flex flex-row justify-between items-center gap-4',
        )}>
            <div
                className={twJoin(
                    'flex flex-row gap-4 justify-start items-center',
                    'w-full'
                )}
            >
                {items.map(renderInfoItem)}
            </div>
            <ProtectedFeatureRequiredLogin>
            {
                usingTemplateProfileCardId === template?.id ?

                    <Button
                        colorcustom={'secondary'}
                        sizecustom={'lg'}
                    >
                        Using
                    </Button>
                    :
                    <Button
                        colorcustom={'primary'}
                        sizecustom={'lg'}
                        onClick={handleUseTemplate}
                    >
                        Use
                    </Button>
            }
            </ProtectedFeatureRequiredLogin>
            {
                !templateIds.includes(template?.id as any) ?
                    <button className={twJoin(
                        'text-grvd-theme-sys-dark-primary',
                        'hover:scale-105 transition-transform duration-300 ease-in-out',
                        'bg-white/10',
                        'rounded-full',
                        'relative'
                    )}
                            onClick={handleAddTemplate}
                    >
                        <div className={twJoin(
                            'hover:animate-ping',
                            'hover:bg-white/10',
                            'w-full h-full ',
                            'absolute rounded-full -z-0',
                        )}/>
                        <IoAdd size={48}/>
                    </button>
                    :
                    <button className={twJoin(
                        'text-grvd-theme-sys-dark-primary',
                        'hover:scale-105 transition-transform duration-300 ease-in-out',
                        'bg-white/10',
                        'rounded-full',
                    )}
                            onClick={handleRemoveTemplate}
                    >
                        <IoIosRemove size={48}/>
                    </button>
            }
        </div>
    );
}

export interface ITemplateCardMainProps extends React.ComponentProps<'div'> {

}

export function TemplateCardMain(props: ITemplateCardMainProps) {
    const template = useTemplate();
    const renderTemplateTagLabels = (tagLabel: string) => {
        return (
            <Typography
                key={tagLabel}
                variant={'small'}
                className={twJoin(
                    'px-2 py-1 rounded-md',
                    'text-grvd-theme-sys-dark-primary',
                    'bg-white/10',
                )}
            >
                {tagLabel}
            </Typography>
        );

    };
    return (
        <div
            className={twJoin(
                'flex flex-col gap-4',
                'w-full'
            )}
        >
            <div
                className={'flex flex-row flex-wrap items-center justify-start gap-2'}
            >
                {template?.tagLabels?.map(renderTemplateTagLabels)}
            </div>
            <div
                className={'flex flex-col gap-0'}
            >
                <Typography
                    variant={'h6'}
                    className={'text-grvd-theme-sys-dark-primary'}
                >
                    {template?.name}
                </Typography>
                <Typography
                    variant={'paragraph'}
                    className={'text-grvd-theme-sys-dark-on-primary-variant'}
                >
                    {template?.brief}
                </Typography>
            </div>
        </div>
    );
}