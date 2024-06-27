// CREATE TABLE IF NOT EXISTS permissions
// (
//     id          SERIAL PRIMARY KEY,
//     name        VARCHAR(255)             NOT NULL,
//     description TEXT,
//     created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
//     updated_at  TIMESTAMP WITH TIME ZONE NOT NULL
// );

import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at'})
    createdAt: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at'})
    updatedAt: Date;
}