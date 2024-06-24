import {PartialType} from "@nestjs/mapped-types";
import {IsEmail, IsString, IsUUID} from "class-validator";

/**
 * @version 2.0
 */
export class UserDto {
    @IsUUID()
    readonly id?: string;

    @IsEmail({}, {message: 'Invalid email'})
    readonly email: string;

    @IsString({message: 'Profile id must be a string'})
    readonly profileId: string;
}

export class UpdateUserDto extends PartialType(UserDto) {
}