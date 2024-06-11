import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity('avatar_2d')
export class Avatar2D {
    @PrimaryColumn({type: 'uuid', nullable: false, name: 'id'})
    id: string;

    @Column({type: 'bytea', nullable: false, name: 'data'})
    data: any;

    @Column({type: 'text', nullable: true, name: 'alt_texts', array: true})
    altTexts: string[];
}