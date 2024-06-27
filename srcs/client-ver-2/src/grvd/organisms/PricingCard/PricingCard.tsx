import {PricingCardBasic, PricingCardPremium} from "grvd/organisms/PricingCard/PricingCardTemplate";

export type TPricingCardType = 'basic' | 'standard' | 'premium';
export type TLevel = 'basic' | 'standard' | 'premium';
export type TFeature = {
    description: string;
    allow: boolean;
}
export type TPricingCard = {
    title: string;
    description: string;
    price: string;
    features: TFeature [];
    level: TLevel;
    triggerText?: string;
};

export interface IPricingCard {
    type: TPricingCardType;
}

export function PricingCard(props: IPricingCard) {
    switch (props.type) {
        case 'basic':
            return (
                <PricingCardBasic/>
            );
        case 'premium':
            return(
                <PricingCardPremium/>
            )
        default:
            return (
                <PricingCardBasic/>
            );
    }
}