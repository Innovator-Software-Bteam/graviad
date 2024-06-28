import {IsEnum} from "class-validator";

export class PermissionDto {
    readonly name: string;
    readonly description: string;
}