import {PartialType} from "@nestjs/mapped-types";
import {IsEmail, IsOptional, IsString, IsUUID} from "class-validator";

/**
 * @version 2.0
 */
export class CreateUserDto {
    @IsUUID()
    readonly id?: string;

    @IsEmail({}, {message: 'Invalid email'})
    readonly email: string;

    @IsString({message: 'Profile id must be a string'})
    readonly profileId: string;

    @IsOptional()
    @IsString({message: 'Merchant id must be a string'})
    readonly merchantId?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}