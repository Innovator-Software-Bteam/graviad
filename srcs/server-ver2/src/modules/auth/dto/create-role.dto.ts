import {IsEnum} from "class-validator";

export class CreateRoleDto {
    @IsEnum(['admin', 'user', 'customer'])
    readonly name: string;
    readonly description: string;
}