import {User} from "@app/modules/user/entities";
import {
    Column,
    Entity, Generated,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn, PrimaryGeneratedColumn, RelationId, Unique
} from "typeorm";
import {SocialLinkProvider} from "@app/modules/user/user.interface";
import {Product} from "@app/modules/product/entities/product.entity";

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

    @PrimaryColumn({type: 'varchar', nullable: false, name: 'email'})
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

}

@Entity('social_links')
export class SocialLink {
    @PrimaryColumn({type: 'int', nullable: false, name: 'id'})
    id: number;

    @Column({type: 'varchar', nullable: false, name: 'provider',})
    provider: SocialLinkProvider;

    @Column({type: 'varchar', nullable: false, name: 'data'})
    data: string;

    @ManyToOne(() => Merchant, merchant => merchant.socialLinks)
    @JoinColumn({name: 'merchant_id', referencedColumnName: 'id'})
    merchant: Merchant;
}




