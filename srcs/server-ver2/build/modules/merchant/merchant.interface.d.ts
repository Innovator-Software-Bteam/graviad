import { IQuery } from "@app/interfaces";
export type TSocialLinkProvider = 'facebook' | 'twitter' | 'instagram' | 'website';
export interface IMerchantQuery extends IQuery {
}
export interface IMerchantAction {
    addTemplate?(merchantId: string, templateId: number): any;
    removeTemplate?(merchantId: string, templateId: number): any;
}
