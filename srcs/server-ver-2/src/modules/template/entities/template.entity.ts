import {Column, Entity, PrimaryColumn} from "typeorm";
import {ObjectType, TemplateType, TObjectType, TTemplateType} from "@app/modules/template";

@Entity('templates')
export class Template {
    @PrimaryColumn({type: 'int', nullable: false, name: 'id'})
    id: number;

    @Column({type: 'varchar', nullable: false, name: 'name'})
    name: string;

    @Column({type: 'varchar', nullable: true, name: 'brief'})
    brief: string;

    @Column({type: 'varchar', nullable: false, name: 'description'})
    description: string;

    @Column({type: 'varchar', nullable: true, name: 'version'})
    version: string;


    @Column({type: 'varchar', nullable: true, name: 'object_type', enum: ObjectType})
    objectType: TObjectType;

    @Column({type: 'varchar', nullable: true, name: 'template_type', enum: TemplateType})
    templateType: TTemplateType;

    @Column({type: 'int', nullable: true, name: 'number_of_likes'})
    numberOfLikes: number;

    @Column({type: 'jsonb', nullable: true, name: 'tag_labels', array: true})
    tagLabels: string[];
}