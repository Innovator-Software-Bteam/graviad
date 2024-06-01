export type TThumbnail2D = {
    id?: string;
    data: any;
};
export type TProduct = {
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
    features: TFeature[];
};
export type TProductFeature = {
    id: string;
    title: string;
    description: string;
}