export declare class CreateUserDto {
    readonly id?: string;
    readonly email: string;
    readonly profileId: string;
    readonly merchantId?: string;
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
