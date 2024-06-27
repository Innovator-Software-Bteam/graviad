import {IsEnum} from "class-validator";

export class RoleDto {
    @IsEnum(['admin', 'user', 'customer'])
    readonly name: string;
    readonly description: string;
}