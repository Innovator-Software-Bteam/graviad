import {IBoardProps} from "./index";
import {Card, Carousel} from "@material-tailwind/react";
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
        <Carousel
            autoplay={true}
            autoplayDelay={5000}
            loop={true}
            transition={{duration: 1}}
            className={twJoin(
                'w-full h-full rounded-[32px]',
            )}
        >
            <img
                src={'/assets/board_poster_1.png'}
                alt={'dashboard_demo'}
                className={twJoin(
                    'bottom-0 object-cover w-full'
                )}
            />
            <img
                src={'/assets/board_poster_2.png'}
                alt={'dashboard_demo'}
                className={twJoin(
                    'bottom-0 object-cover w-full'
                )}
            />
        </Carousel>
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