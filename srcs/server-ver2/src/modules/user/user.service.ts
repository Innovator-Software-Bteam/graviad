import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {ICrud} from "@app/interfaces";
import {Merchant, Profile, SocialLink, User} from "@app/modules/user/entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserDto} from "@app/modules/user/dto/create-user.dto";
import {CreateMerchantDto, CreateSocialLinkDto, UpdateMerchantDto, UpdateSocialLinkDto} from "@app/modules/user/dto";
import {TProfile} from "@app/modules/user";
import * as console from "node:console";

@Injectable()
export class UserService implements ICrud<User, CreateUserDto, UpdateMerchantDto> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,
    ) {

    }

    async create(dto?: CreateUserDto): Promise<User> {
        const user: User = new User();
        user.email = dto?.email;

        return await this.userRepository.save(user);
    }

    async delete(id: any): Promise<any> {
        return await this.userRepository.delete(id);
    }

    async findAll(option?: any): Promise<User[]> {
        return await this.userRepository
            .find({
                relations: ['profile'],
            })
            .catch(err => {
                console.log(err);
                return [];
            });
    }

    async findAllByQuery(query: any): Promise<User[]> {
        const {limit, page, ...where} = query;
        const take = limit && Number(limit);
        const skip = page && Number(page) * take;
        return this.userRepository
            .find({
                where,
                take,
                skip,
                relations: ['profile'],
            })
            .catch(err => {
                console.log(err);
                return [];
            });
    }

    async findBy(option?: any): Promise<User> {
        return await this.userRepository.findOneBy({
            ...option
        });
    }

    async update(id: any, dto?: UpdateMerchantDto): Promise<any> {
        return await this.userRepository.update({
            id,
        }, dto);
    }



}

@Injectable()
export class MerchantService implements ICrud<Merchant, CreateMerchantDto, UpdateMerchantDto> {
    constructor(
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,

        @InjectRepository(SocialLink)
        private readonly socialLinkRepository: Repository<SocialLink>,
    ) {
    }

    async create(dto: CreateMerchantDto): Promise<Merchant> {
        const merchant: Merchant = new Merchant();
        merchant.email = dto.email;
        merchant.address = dto?.address;
        merchant.phone = dto?.phone;
        merchant.description = dto?.description;
        merchant.slogan = dto?.slogan;
        merchant.numberOfLikes = dto?.numberOfLikes;
        merchant.numberOfProducts = dto?.numberOfProducts;

        return await this.merchantRepository.save(merchant);
    }

    async delete(id: any): Promise<any> {
        return await this.merchantRepository.delete(id);
    }


    async findAll(): Promise<Merchant[]> {
        return this.merchantRepository
            .find({
                relations: ['socialLinks']
            }).catch(err => {
                console.log(err);
                return [];
            });
    }

    async findBy(option?: any): Promise<Merchant> {
        return await this.merchantRepository.findOneBy({
            ...option
        });
    }

    async update(id: any, dto?: UpdateMerchantDto): Promise<any> {
        const oldMerchant: Merchant = await this.merchantRepository.findOneBy({id});
        const socialLinks: SocialLink [] = await Promise.all(dto?.socialLinks.map(async (socialLink) => {
            const oldSocialLink: SocialLink = await this.socialLinkRepository.findOneBy({id: socialLink?.id});
            if (!oldSocialLink) {
                const newSocialLink: SocialLink = new SocialLink();
                newSocialLink.provider = socialLink?.provider;
                newSocialLink.data = socialLink?.data;
                newSocialLink.merchant = oldMerchant;
                return await this.socialLinkRepository.save(newSocialLink);
            }
            oldSocialLink.provider = socialLink?.provider;
            oldSocialLink.data = socialLink?.data;
            oldSocialLink.merchant = oldMerchant;
            return await this.socialLinkRepository.save(oldSocialLink);
        }));

        return await this.merchantRepository.save({
            id,
            ...dto,
            socialLinks,
        });
    }


    async findAllByQuery(query: any): Promise<Merchant[]> {
        const {limit, page, ...where} = query;
        const take = limit && Number(limit);
        const skip = page && Number(page) * take;
        return this.merchantRepository
            .find({
                where,
                take,
                skip,
                relations: ['socialLinks']
            })
            .catch(err => {
                console.log(err);
                return [];
            });
    }
}

@Injectable()
export class SocialLinkService implements ICrud<SocialLink, CreateSocialLinkDto, UpdateSocialLinkDto>{
    constructor(
        @InjectRepository(SocialLink)
        private readonly socialLinkRepository: Repository<SocialLink>
    ) {
    }

    async create(dto: CreateSocialLinkDto): Promise<SocialLink> {
        const socialLink: SocialLink = new SocialLink();
        socialLink.provider = dto.provider;
        socialLink.data = dto.data;

        return this.socialLinkRepository.save(socialLink);
    }

    async delete(id: any): Promise<any> {
        return this.socialLinkRepository.delete(id);
    }

    async findAll(): Promise<SocialLink[]> {
        return this.socialLinkRepository.find();
    }

    async findOne(id: any): Promise<SocialLink> {
        return this.socialLinkRepository.findOneBy({id});
    }

    async update(id: any, dto: UpdateSocialLinkDto): Promise<any> {
        if(!id) return await this.socialLinkRepository.save(dto);
        return await this.socialLinkRepository.update(id, dto);
    }
}

@Injectable()
export class ProfileService implements ICrud<Profile, TProfile> {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ) {
    }

    async create(dto?: TProfile): Promise<Profile> {
        const profile: Profile = new Profile();
        profile.id = dto.id;
        profile.provider = dto.provider;
        profile.data = dto;

        return this.profileRepository.save(profile);
    }

    async delete(id: any): Promise<any> {
        return this.profileRepository.delete(id);
    }

    async findAll(): Promise<Profile[]> {
        return this.profileRepository.find();
    }

    async findBy(id: any): Promise<Profile> {
        return this.profileRepository.findOneBy({id});
    }
}