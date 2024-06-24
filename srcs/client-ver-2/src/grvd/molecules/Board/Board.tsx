import {IBoardProps} from "./index";
import {Card} from "@material-tailwind/react";
import {ProductCardsContainer} from "grvd/molecules";
import React from "react";
import {twJoin} from "tailwind-merge";
import axios from "axios";
import config from "../../../config";
import {ProfileOwnerBar} from "grvd/molecules/User/ProfileOwnerBar";
import {TMerchant} from "grvd";
import {useDialog} from "grvd/organisms";

export function Board({children}: IBoardProps) {
    return (
        <Card className={twJoin(
            'bg-grvd-theme-sys-dark-surface-container-lowest',
            'rounded-3xl w-full aspect-video'
        )}
              shadow={false}
        >
            {children}
        </Card>
    );
}

export function BoardAdvertisement({}: IBoardProps) {
    return (
        <ProductCardsContainer/>
    );
}

export function BoardTopMerchant({}: IBoardProps) {
    const [topMerchants, setTopMerchants] = React.useState<TMerchant []>([]);
    const {open} = useDialog();
    const loadTopMerchants = () => {
        axios.get(`${config.server.url}/merchants`, {
            withCredentials: true,
            params: {
                relations: ['avatar'],
            }
        })
            .then((res) => {
                setTopMerchants(res.data);
            })
            .catch((err) => {
                open(null, 'error');
                console.error(err);
            });
    };
    React.useEffect(() => {
        loadTopMerchants();
    }, []);
    return (
        <div className={'flex flex-col gap-8'}>
            {topMerchants.map((owner: TMerchant, index) => {
                return (
                    <ProfileOwnerBar owner={owner as any} key={index}/>
                )
            })}
        </div>
    );
}