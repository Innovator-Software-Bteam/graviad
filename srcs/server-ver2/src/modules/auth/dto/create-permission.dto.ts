import {IsEnum} from "class-validator";

export class CreatePermissionDto {
    readonly name: string;
    readonly description: string;
}