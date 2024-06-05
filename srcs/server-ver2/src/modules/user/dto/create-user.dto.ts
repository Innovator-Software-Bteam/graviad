import {PartialType} from "@nestjs/mapped-types";
import {IsEmail, IsUUID} from "class-validator";

/**
 * @version 2.0
 */
export class CreateUserDto {
    @IsUUID()
    readonly id?: string;
    @IsEmail({}, {message: 'Invalid email'})
    readonly email: string;
    readonly profileId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}