export declare class CreateAvatarDTO {
    readonly id?: number;
    readonly data: any;
    readonly altTexts: string[];
    readonly merchantId: string;
}
declare const UpdateAvatarDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAvatarDTO>>;
export declare class UpdateAvatarDTO extends UpdateAvatarDTO_base {
}
export {};
