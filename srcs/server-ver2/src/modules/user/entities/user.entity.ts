import {
    Entity,
    Column,
    PrimaryColumn,
    OneToMany,
    Exclusion,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import {TProfile} from "@app/modules/user";

/**
 * @version 2.0
 */

@Entity('profiles')
export class Profile {
    @PrimaryColumn({type: 'varchar', nullable: false, name: 'id'})
    id: string;

    @Column({type: 'varchar', nullable: false, name: 'provider'})
    provider: string;

    @Column({type: 'jsonb', nullable: false, name: 'data'})
    data: TProfile;
}

@Entity('users')
export class User {
    @PrimaryColumn({type: 'uuid', nullable: false, name: 'id'})
    id: string;

    @Column({type: 'varchar', nullable: false, name: 'email'})
    email: string;

    @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at'})
    createdAt: Date;

    @Column({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'updated_at'})
    updatedAt: Date;

    @OneToOne(() => Profile)
    @JoinColumn({name: 'profile_id'})
    profile: Profile;
}