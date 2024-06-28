import {IPageProps} from "grvd/pages/types";
import {
    TemplateProfileCard,
    TemplateProfileCardGlass,
    TemplateProfileCardSimple, TemplateProfileCardWhiteSmooth
} from "grvd/molecules/User/templates/TemplateProfileCard";
import {MerchantContext, useUser} from "grvd/contexts";
import {TemplateCard} from "grvd/molecules/Template/TemplateCard";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../../../config";
import {TTemplate} from "grvd/molecules/Template/types";
import {ProfileCard} from "grvd/molecules";
import {TemplateContext} from "grvd/molecules/Template/TemplateContext";
import {useFilterInput} from "grvd/organisms/SearchInput/FilterInputContext";
import {twJoin} from "tailwind-merge";
import {TSocialLink} from "grvd";

export interface IMenuTemplatePageProps extends IPageProps {
}

export function MenuTemplatePage(props: IMenuTemplatePageProps) {
    const user = useUser();
    const [templates, setTemplates] = useState<TTemplate []>([]);
    const {handleFilter} = useFilterInput();
    const loadTemplates = async () => {
        await axios
            .get(`${config.server.url}/templates`, {
                withCredentials: true,
            })
            .then((res) => {
                setTemplates(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };
    useEffect(() => {
        loadTemplates().then().catch();
        console.log(templates);
    }, []);
    return (
        <MerchantContext.Provider value={{
            name: 'Merchant\'s name',
            id: 'merchant-id',
            userId: 'user-id',
            slogan: 'Merchant\'s slogan',
            description: 'Merchant\'s description',
            phone: '0123456789',
            email: 'example@gmail.com',
            address: 'Merchant\'s address',
            socialLinks: [
                {
                    provider: 'facebook',
                    data: 'https://facebook.com',
                },
                {
                    id: 'instagram',
                    provider: 'https://instagram.com',
                },
                {
                    id: 'twitter',
                    provider: 'https://twitter.com',
                },
            ] as TSocialLink [],
        }}>
            <div className={twJoin(
                'grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-auto',
                'gap-16',
                'w-full',
            )}>
                {templates.filter(template => {
                    return handleFilter ? handleFilter(template) : true;
                }).map((template, index) => {
                    return (
                        <TemplateContext.Provider value={template} key={index}>
                            <TemplateCard>
                                <ProfileCard typeCustom={template.templateType}/>
                            </TemplateCard>
                        </TemplateContext.Provider>
                    );
                })}
            </div>
        </MerchantContext.Provider>
    );
}