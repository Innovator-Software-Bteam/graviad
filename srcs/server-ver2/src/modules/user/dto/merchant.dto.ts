import {PartialType} from "@nestjs/mapped-types";
import {UserDto} from "@app/modules/user/dto/user.dto";
import {TSocialLinkProvider} from "@app/modules/user/user.interface";
import {IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsUUID, Max} from "class-validator";
import {CreateAvatar2DDto} from "@app/modules/user/dto/image.dto";

/**
 * @version 2.0
 */
export class MerchantDto {
    @IsUUID()
    readonly id?: string;

    @IsNotEmpty({message: 'Name is required'})
    readonly name: string;

    @IsEmail({}, {message: 'Invalid email'})
    readonly email: string;

    readonly description: string;

    // @Max(60, {message: 'Slogan must be less than 60 characters'})
    readonly slogan: string;

    readonly address: string;
    readonly phone: string;

    @IsArray({message: 'Social links must be an array'})
    readonly socialLinks: CreateSocialLinkDto [];

    @IsNumber({}, {message: 'Number of likes must be a number'})
    readonly numberOfLikes: number;

    @IsNumber({}, {message: 'Number of products must be a number'})
    readonly numberOfProducts: number;

    readonly avatar: CreateAvatar2DDto;
}

export class UpdateMerchantDto extends PartialType(MerchantDto) {

}

export class CreateSocialLinkDto {
    readonly id?: number;

    @IsNotEmpty({message: 'Data is required'})
    readonly provider: TSocialLinkProvider;

    @IsNotEmpty({message: 'Data is required'})
    readonly data: string;

    @IsUUID()
    readonly merchantId: string;
}

export class UpdateSocialLinkDto extends PartialType(CreateSocialLinkDto) {
}