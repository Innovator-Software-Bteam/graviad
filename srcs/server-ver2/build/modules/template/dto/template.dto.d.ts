import { TObjectType, TTemplateType } from "@app/modules/template";
export declare class CreateTemplateDTO {
    readonly id?: number;
    readonly name: string;
    readonly objectType?: TObjectType;
    readonly templateType?: TTemplateType;
    readonly description: string;
    readonly brief: string;
    readonly numberOfLikes?: number;
    readonly tagLabels?: string[];
    readonly version?: string;
}
declare const UpdateTemplateDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTemplateDTO>>;
export declare class UpdateTemplateDTO extends UpdateTemplateDTO_base {
}
export {};
