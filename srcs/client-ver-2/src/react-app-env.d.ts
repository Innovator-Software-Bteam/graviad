/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PUBLIC_URL: string;
        REACT_APP_NODE_ENV: string;
        REACT_APP_API_URL: string;
        REACT_APP_DRIVE_NEW_API_URL: string;
        REACT_APP_PHOTOS_API_URL: string;
        REACT_APP_PAYMENTS_API_URL: string;
        REACT_APP_CRYPTO_SECRET: string;
        REACT_APP_CRYPTO_SECRET2: string;
        REACT_APP_BRIDGE: string;
        REACT_APP_PROXY: string;
        REACT_APP_NOTIFICATIONS_URL: string;
        REACT_APP_STRIPE_PK: string;
        REACT_APP_STRIPE_TEST_PK: string;
        REACT_APP_SEGMENT_KEY: string;
        REACT_APP_SEGMENT_DEBUG: string;
        REACT_APP_RECAPTCHA_V3: string;
        REACT_APP_SHARE_LINKS_DOMAIN: string;
        REACT_APP_HOSTNAME: string;

        REACT_APP_GRAVIAD_SERVER_SCHEMA: string;
        REACT_APP_GRAVIAD_SERVER_HOST: string;
        REACT_APP_GRAVIAD_SERVER_PORT: number;

        REACT_APP_GRAVIAD_CLIENT_SCHEMA: string;
        REACT_APP_GRAVIAD_CLIENT_HOST: string;
        REACT_APP_GRAVIAD_CLIENT_PORT: number;
    }
}
declare module 'grvd' {
    /**
     * @description [User] Type of user to fetch json.
     */
    type TUser = {
        id: string;
        email: string;
        role: Role;
        profile: TProfile;
        merchant?: TMerchant;

    }
    type TAvatar2D = {
        id?: string;
        data: any;
        alt_texts?: string[];
    }

    type TSocialLink = {
        id?: string;
        provider: string;
        data: string;
    };

    type TMerchant = {
        id?: string;
        name?: string;
        description?: string;
        slogan?: string;
        email?: string;
        phone?: string;
        address?: string;
        socialLinks?: any [];
        numberOfLikes?: number;
        numberOfProducts?: number;
        avatar?: TAvatar2D;
        avatarId?: string;
    }
    type TProfileGoogle = {
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
    type TProfileFacebook = {
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
    type TProfile = TProfileFacebook | TProfileGoogle;
    type TRole = "user" | "customer" | "enterprise";

    /**
     * @description [ProductPage] Type of product to fetch json.
     */
    type TThumbnail2D = {
        id?: string;
        data: any;
    };
    type TMediaFromSpline={
        id?: string;
        data: any;
    }
    type TProduct = {
        id?: string;
        name: string;
        merchantId: string;
        description?: string;
        brief?: string;
        price?: number | string;
        link?: string;
        version?: string;
        dateRelease?: Date;
        highlightLabel?: string;
        numberOfLikes?: number;
        thumbnail2D?: TThumbnail2D;
        features: TProductFeature[];
        mediaFromSpline?: TMediaFromSpline;
        merchant?: TMerchant;
        likedByIds?: string [];
    };
    type TProductFeatureKey = 'name' | 'description';
    type TProductFeature = {
        id?: string;
        productId?: string;
        name: string;
        description: string;
    }
}
declare module "*.tsx";
declare module "*.ts";