import {PartialType} from "@nestjs/mapped-types";
import {TSocialLinkProvider} from "../merchant.interface";
import {
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber, IsOptional,
    IsPhoneNumber,
    IsString,
    IsUUID, Length,
    Max,
    ValidateIf
} from "class-validator";
import {CreateAvatarDTO} from "@app/modules/user/dto/property.dto";
import {CreateTemplateDTO} from "@app/modules/template/dto/template.dto";
import {CreateUserDto} from "@app/modules/user";

/**
 * @version 2.0
 */
export class CreateMerchantDto {
    @IsOptional()
    @IsUUID()
    readonly id?: string;

    @IsNotEmpty({message: 'Name is required'})
    readonly name: string;

    @IsEmail({}, {message: 'Invalid email'})
    readonly email: string;

    @IsOptional()
    @IsString({message: 'Description must be a string'})
    readonly description: string;

    @IsOptional()
    @Length(1, 100, {message: 'Slogan must be between 1 and 100 characters'})
    readonly slogan: string;

    @IsOptional()
    @IsString({message: 'Address must be a string'})
    readonly address: string;

    @IsOptional()
    @IsString({message: 'Phone must be a string'})
    readonly phone: string;

    @IsOptional()
    @IsArray({message: 'Social links must be an array'})
    readonly socialLinks: CreateSocialLinkDto [];

    @IsOptional()
    @IsNumber({}, {message: 'Number of likes must be a number'})
    readonly numberOfLikes: number;

    @IsOptional()
    @IsNumber({}, {message: 'Number of products must be a number'})
    readonly numberOfProducts: number;

    @IsOptional()
    readonly avatar: CreateAvatarDTO;


    @IsOptional()
    readonly usingTemplateProfileCardId: number;

    @IsOptional()
    readonly userId: string;
}

export class UpdateMerchantDto extends PartialType(CreateMerchantDto) {

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