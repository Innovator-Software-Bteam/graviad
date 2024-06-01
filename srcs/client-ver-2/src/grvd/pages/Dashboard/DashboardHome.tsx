import {Typography} from "@material-tailwind/react";
import React from "react";
import {ProductCardsContainer} from "grvd/molecules/Product";

export function DashboardHome() {
    return (
        <div>
            <Typography variant={'h4'} className={'text-grvd-theme-sys-dark-primary'}>
                Advertisement
            </Typography>
            <ProductCardsContainer/>
        </div>
    )
}