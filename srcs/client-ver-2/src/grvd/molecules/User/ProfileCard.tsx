import React from 'react';
import {tv} from "tailwind-variants";
import {twJoin} from "tailwind-merge";
import {
    TemplateProfileCardBlack,
    TemplateProfileCardGlass,
    TemplateProfileCardSimple,
    TemplateProfileCardWhiteSmooth
} from "grvd/molecules/User/templates/TemplateProfileCard";
import {useTemplate} from "grvd/molecules/Template/TemplateContext";

export type TStyleCard = 'basic' | 'simple' | 'white-smooth' | 'black' | 'glass';

export interface IProfileCardProps extends React.ComponentProps<'div'> {
    typeCustom?: TStyleCard;
}

const baseCard = tv({
    base: twJoin(
        'w-full min-w-[500px] aspect-[5/3] p-8 rounded-3xl',
        'flex flex-col items-center justify-between',
        'relative',
    ),
    variants: {
        simple: 'bg-gray-100',
        luxury: 'bg-gray-200',
        glass: 'bg-gray-300',
        modern: 'bg-gray-400',
    }
});

export function ProfileCard(props: IProfileCardProps) {
    const {typeCustom = 'basic', ...rest} = props;
    switch (typeCustom) {
        case 'simple':
            return (
                <TemplateProfileCardSimple/>
            );
        case 'white-smooth':
            return (
                <TemplateProfileCardWhiteSmooth/>
            );
        case 'glass':
            return (
                <TemplateProfileCardGlass/>
            );
        case 'black':
            return (
                <TemplateProfileCardBlack/>
            );
        default:
            return (
                <TemplateProfileCardSimple/>
            );
    }
}