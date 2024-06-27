import { TObjectType, TTemplateType } from "@app/modules/template";
export declare class Template {
    id: number;
    name: string;
    brief: string;
    description: string;
    version: string;
    objectType: TObjectType;
    templateType: TTemplateType;
    numberOfLikes: number;
    tagLabels: string[];
}
