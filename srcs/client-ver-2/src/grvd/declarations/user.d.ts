export type TUser = {
    id: string;
    email: string;
    role: Role;
    profile: TProfile;
    merchant?: TMerchant;

}
export type TMerchant = {
    id: string;
    name?: string;
    description?: string;
    slogan?: string;
    email?: string;
    phone?: string;
    address?: string;
    socialLinks?: any [];
    numberOfLikes?: number;
    numberOfProducts?: number;
}
export type TProfileGoogle = {
    id: string;
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
    };
    photos: {
        value: string;
    } [];
    emails: {
        value: string;
    } [];
    provider: string;
}
export type TProfileFacebook = {
    id: string;
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
    };
    photos: {
        value: string;
    } [];
    emails: {
        value: string;
    } [];
    provider: string;
}
export type TProfile = TProfileFacebook | TProfileGoogle;
export type TRole = "user" | "customer" | "enterprise";
