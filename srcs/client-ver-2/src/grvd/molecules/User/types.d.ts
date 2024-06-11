import {TAvatar2D} from "grvd";

export type TFormInput = {
    email: string;
    phone: string;
    address: string;
    description: string;
    slogan: string;
    facebookLink: string;
    twitterLink: string;
    instagramLink: string;
    avatar: TAvatar2D;
}
export type TSocialLink = {
    id?: string;
    provider: string;
    data: string;
};