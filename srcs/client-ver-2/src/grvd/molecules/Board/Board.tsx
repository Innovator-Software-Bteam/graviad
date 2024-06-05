import {IBoardProps} from "./index";
import {Card} from "@material-tailwind/react";
import {ProductCardsContainer} from "grvd/molecules";
import React from "react";
import {twJoin} from "tailwind-merge";
import axios from "axios";
import config from "../../../config";
import {ProfileOwnerBar} from "grvd/molecules/User/ProfileOwnerBar";
import {TUser} from "grvd";

export function Board({}: IBoardProps) {
    return (
        <Card className={twJoin(
            'bg-grvd-theme-sys-dark-surface-container-lowest',
            'rounded-3xl w-full aspect-video'
        )}
              shadow={false}
        >
        </Card>
    );
}
export function BoardAdvertisement({}: IBoardProps) {
    return (
        <ProductCardsContainer/>
    );
}
export function BoardTopMerchant({}: IBoardProps) {
    const [topMerchants, setTopMerchants] = React.useState([]);
    const loadTopMerchants = () => {
        axios.get(`${config.server.url}/users`, {
            withCredentials: true,
            params: {
                merchant: true,
            }
        })
            .then((res) => {
                setTopMerchants(res.data.map((user: any) => {
                    return {
                        ...user,
                        profile: user.profile.data,
                    };
                }));
            })
            .catch((err) => {
                console.error(err);
            });
    };
    React.useEffect(() => {
        loadTopMerchants();
    }, []);
    return (
        <div className={'flex flex-col gap-8'}>
            {topMerchants.map((owner: TUser) => {
                return(
                    <ProfileOwnerBar user={owner as any}/>
                )
            })}
        </div>
    );
}