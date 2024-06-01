import {TMerchant, TProduct, TProductFeature} from "grvd";
import {IProductProps} from "./ProductDetailForPreview";
import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";
import {ProductDetailFileUploadArea, ProductDetailPreviewArea, ProductFeatureEditArea} from "./ProductDetailForEdit";

/**
 * @description [Product] Product Card
 */
export interface IProductCardProps extends React.ComponentProps<"div"> {
    id?: string;
    product?: TProduct;
}
export type TProductPreviewProps = {
    id?: string;
    product?: TProduct;
}

export interface IProductPreview3DAreaProps extends IProductProps {

}

export interface IProductSpecificationsAreaProps extends IProductProps {

}

/**
 * @description [Product] Product Detail
 */
export interface IProductDetailsAreaProps extends IProductProps {

}

export type TProductTerms = {
    term: string;
    content: any;
}

export interface IProductOwnerAreaProps extends IProductProps {
    owner?: TMerchant;
}

/**
 * @description [Product] Product Create Form
 */
export interface IProductCreateFormProps extends React.ComponentProps<"div"> {

}

export type TProductCreateForm = {
    name: string;
    price: string;
    label: string;
    version: string;
    brief: string;
    fileThumbnail: File;
    // fileModel: File;
};
export type TInput = {
    title: string;
    register: UseFormRegisterReturn<any>;
};
export type TInputProps = {
    title: string;
    register: UseFormRegisterReturn<any>;
}

/**
 * @description [Product] Product Detail For Edit
 */
export interface IProductDetailForEditProps extends IProductProps {

}
export interface IProductDetailForm extends IProductProps {
    productForm?: TProduct
}

export interface IProductFeatureEditAreaProps extends React.ComponentProps<"div"> {
    features?: TProductFeature[];
    setFeatures: React.Dispatch<React.SetStateAction<TProductFeature[]>>;
}
export interface IProductDetailPreviewAreaProps extends IProductProps {

}
export interface IProductFeatureEditAreaProps extends IProductProps {

}
export interface IProductDetailFileUploadAreaProps extends IProductProps {

}
export type TProductDetailForm = {
    name: string;
    highlightLabel: string;
    price: string;
    version: string;
    brief: string;
    link: string;
    description: string;
    numberOfLikes: number;
    features: TProductFeature[];
    fileThumbnail?: File;
}
