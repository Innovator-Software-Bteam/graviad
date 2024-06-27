import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('avatar_2d')
export class Avatar {
    @PrimaryGeneratedColumn({type: 'int', name: "id"})
    id: number;

    @Column({type: 'bytea', nullable: false, name: 'data'})
    data: any;

    @Column({type: 'uuid', nullable: false, name: 'merchant_id'})
    merchantId: string;

    @Column({type: 'text', nullable: true, name: 'alt_texts', array: true})
    altTexts: string[];
}
