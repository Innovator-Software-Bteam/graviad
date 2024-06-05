import {
    Column,
    Entity, JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn, Unique
} from "typeorm";
import {TSocialLinkProvider} from "@app/modules/user";
import {Avatar2D} from "@app/modules/user";

@Entity('merchants')
export class Merchant {
    @PrimaryColumn({type: 'uuid', nullable: false, name: 'id'})
    id: string;

    @Column({type: 'varchar', nullable: true, name: 'phone'})
    phone: string;

    @Column({type: 'varchar', nullable: true, name: 'address'})
    address: string;

    @Column({type: 'varchar', nullable: true, name: 'name', unique: true})
    name: string;

    @Column({type: 'varchar', nullable: false, name: 'email'})
    email: string;

    @Column({type: 'varchar', nullable: true, name: 'description'})
    description: string;

    @Column({type: 'varchar', nullable: true, name: 'slogan'})
    slogan: string;

    @Column({type: 'int', nullable: true, name: 'number_of_likes'})
    numberOfLikes: number;

    @Column({type: 'int', nullable: true, name: 'number_of_products'})
    numberOfProducts: number;

    @OneToMany(() => SocialLink, socialLink => socialLink.merchant)
    socialLinks: SocialLink[];

    @OneToOne(() => Avatar2D)
    @JoinColumn({name: 'avatar_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_merchants_avatar_id'})
    avatar: Avatar2D;
}

@Entity('social_links')
@Unique(['provider', 'merchantId'])
export class SocialLink {
    @PrimaryColumn({type: 'int', nullable: false, name: 'id'})
    id: number;

    @Column({type: 'varchar', nullable: false, name: 'provider',})
    provider: TSocialLinkProvider;

    @Column({type: 'varchar', nullable: false, name: 'data'})
    data: string;

    @ManyToOne(() => Merchant, merchant => merchant.socialLinks)
    @JoinColumn({
        name: 'merchant_id',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_social_links_merchants'
    })
    merchant: Merchant;

    @Column({type: 'uuid', nullable: false, name: 'merchant_id', foreignKeyConstraintName: 'fk_social_links_merchants'})
    merchantId: string;
}




