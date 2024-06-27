import {ObjectType, TemplateType, TObjectType, TTemplateType} from "@app/modules/template";
import {PartialType} from "@nestjs/mapped-types";
import {IsArray, IsEmpty, IsEnum, IsNumber, IsString, ValidateIf} from "class-validator";

export class CreateTemplateDTO {
    @ValidateIf(o => o.id !== undefined, {message: 'Id must be a number'})
    @IsNumber({}, {message: 'Id must be a number'})
    readonly id?: number;

    @IsString({message: 'Name must be a string'})
    readonly name: string;

    @ValidateIf(o => o.objectType !== undefined, {message: 'Object type must be a valid object type'})
    @IsEnum({ObjectType}, {message: 'Object type must be a valid object type'})
    readonly objectType?: TObjectType;

    @ValidateIf(o => o.templateType !== undefined, {message: 'Template type must be a valid template type'})
    @IsEnum({TemplateType}, {message: 'Template type must be a valid template type'})
    readonly templateType?: TTemplateType;

    @ValidateIf(o => o.description !== undefined, {message: 'Description must be a string'})
    @IsString({message: 'Description must be a string'})
    readonly description: string;

    @ValidateIf(o => o.brief !== undefined, {message: 'Brief must be a string'})
    @IsString({message: 'Brief must be a string'})
    readonly brief: string;

    @ValidateIf(o => o.numberOfLikes !== undefined, {message: 'Number of likes must be a number'})
    @IsNumber({}, {message: 'Number of likes must be a number'})
    readonly numberOfLikes?: number;

    readonly tagLabels?: string[];

    @ValidateIf(o => o.version !== undefined, {message: 'Version must be a string'})
    @IsString({message: 'Version must be a string'})
    readonly version?: string;
}
export class UpdateTemplateDTO extends PartialType(CreateTemplateDTO) {

}