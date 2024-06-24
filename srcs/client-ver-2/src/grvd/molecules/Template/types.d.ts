export type TObjectType = 'profile-card' | 'product-view'
export type TTemplate = {
    id?: number;
    name?: string;
    brief?: string;
    description?: string;
    objectType?: TObjectType;
    templateType?: any;
    numberOfLikes?: number;
    version?: number;
    tagLabels?: string[];
}