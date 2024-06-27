/**
 * Reference: Schemas of Graviad Application
 */
import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Permission} from "./permission.entity";
import {User} from "../../user/entities/user.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, enum: ['admin', 'user', 'customer']})
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at'})
    createdAt: Date;

    @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at'})
    updatedAt: Date;

    // Define the relationship
    @OneToMany(() => Permission, permission => permission.id, {cascade: true})
    permissions: Permission[];
}