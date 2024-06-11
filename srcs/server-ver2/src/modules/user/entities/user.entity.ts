import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import {Merchant} from "./merchant.entity";
import {TProfile} from "../index"
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
    @JoinColumn({name: 'profile_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_users_profiles'})
    profile: Profile;

    @Column({type: 'varchar', nullable: false, name: 'profile_id'})
    profileId: string;

    @OneToOne(() => Merchant)
    @JoinColumn({name: 'merchant_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_users_merchant_id'})
    merchant: Merchant;

    @Column({type: 'uuid', nullable: true, name: 'merchant_id'})
    merchantId: string;
}