import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {ICrud} from "@app/interfaces";
import {Avatar2D, Merchant, Profile, SocialLink, User} from "@app/modules/user/entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {
    TProfile,
    CreateUserDto,
    CreateMerchantDto,
    CreateSocialLinkDto,
    UpdateMerchantDto,
    UpdateSocialLinkDto, UpdateUserDto, IAvatarQuery
} from "@app/modules/user";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {IMerchantQuery, IUserQuery} from "@app/modules/user/user.interface";
import {CreateAvatar2DDto, UpdateAvatar2DDto} from "@app/modules/user/dto/create-image.dto";

@Injectable()
export class SocialLinkService implements ICrud<SocialLink, CreateSocialLinkDto, UpdateSocialLinkDto> {
    constructor(
        @InjectRepository(SocialLink)
        private readonly socialLinkRepository: Repository<SocialLink>
    ) {
    }

    async create(dto: CreateSocialLinkDto): Promise<SocialLink> {
        if (!dto.provider) throw new Error('Provider is required')
        if (!dto.data) throw new Error('Data is required')
        if (!dto.merchantId) throw new Error('MerchantId is required')

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

    async update(id?: any, dto?: UpdateSocialLinkDto): Promise<any> {
        return await this.socialLinkRepository.save({
            id,
            ...dto,
        });
    }

    async updatePartial(id: any, dto?: UpdateSocialLinkDto): Promise<any> {
        if (!id) throw new Error('id is required');
        return this.socialLinkRepository.update(id, dto);
    }

    findOrCreate(id?: any, dto?: CreateSocialLinkDto): Promise<SocialLink> {
        const socialLink = this.socialLinkRepository.findOneBy({id});
        if (socialLink) return socialLink;
        return this.create(dto);
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
        if (dto?.id) throw new Error('Id is exist, please use update method');
        const profile: Profile = new Profile();
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

    async findBy(where: FindOptionsWhere<Profile> | FindOptionsWhere<Profile>[]): Promise<Profile> {
        return await this.profileRepository.findOneBy(where);
    }

    async findOrCreate(id?: any, dto?: TProfile): Promise<Profile> {
        const profile = await this.profileRepository.findOneBy({id});
        if (profile) return profile;
        return await this.profileRepository.save(dto);
    }
}

@Injectable()
export class UserService implements ICrud<User, CreateUserDto, UpdateUserDto> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {

    }

    async create(dto?: CreateUserDto): Promise<User> {
        if (dto?.id) throw new Error('Id is exist, please use update method');
        const user: User = new User();
        user.email = dto.email;
        return await this.userRepository.save(dto);
    }

    async delete(id: any): Promise<any> {
        return await this.userRepository.delete(id);
    }

    async findAll({query}: any): Promise<User[]> {
        const {relations, where} = query as IUserQuery;
        return await this.userRepository
            .find({
                relations: relations,
                where: where,
            })
    }

    async findAllByQuery({query}: any): Promise<User[]> {
        const {limit, page, where} = query as IUserQuery;
        const take = limit && Number(limit);
        const skip = page && Number(page) * take;
        return this.userRepository.find({
            where,
            take,
            skip,
            relations: ['profile'],
        })
    }

    async findBy(option?: any): Promise<User> {
        return await this.userRepository.findOneBy({
            ...option
        });
    }

    async findOneBy(...option: any): Promise<User> {
        const [query] = option;
        const {relations, where} = query as IUserQuery

        return await this.userRepository.findOne({
            where,
            relations,
        });
    }

    async update(id: any, dto?: UpdateUserDto): Promise<any> {
        return await this.userRepository.save({
            id,
            email: dto.email,
        });
    }

    async updatePartial(id: any, dto?: UpdateUserDto): Promise<any> {
        if (!id) throw new Error('id is required');
        return await this.userRepository.update(id, dto);
    }

    async findOrCreate(id?: any, dto?: CreateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({id});
        if (user) return user;
        return this.create(dto);
    }

    async findOrCreateByEmail(email: string, dto?: CreateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({
            email
        });
        if (user) return user;
        return this.create(dto);
    }

}

@Injectable()
export class Avatar2DService implements ICrud<Avatar2D, CreateAvatar2DDto, UpdateAvatar2DDto> {
    constructor(
        @InjectRepository(Avatar2D)
        private readonly avatar2DRepository: Repository<Avatar2D>
    ) {
    }

    async create(dto?: CreateAvatar2DDto): Promise<Avatar2D> {
        const avatar2D: Avatar2D = new Avatar2D();
        avatar2D.data = dto.data;
        avatar2D.altTexts = dto.altTexts;
        return await this.avatar2DRepository.save(avatar2D);
    }

    delete(id: any): Promise<Avatar2D>;
    delete(id: any): Promise<any>;
    delete(id: any): Promise<Avatar2D> | Promise<any> {
        return Promise.resolve(undefined);
    }

    deleteAll(): Promise<any> {
        return Promise.resolve(undefined);
    }

    async findAll({query}: any): Promise<Avatar2D[]> {
        const {relations, where} = query as IAvatarQuery;
        return await this.avatar2DRepository.find({
            where,
            relations,
        });
    }

    async findBy({query}: any): Promise<Avatar2D> {
        const {relations, where} = query as IAvatarQuery;
        return await this.avatar2DRepository.findOne({
            where,
            relations,
        });
    }

    async findById(id: any): Promise<Avatar2D> {
        return await this.avatar2DRepository.findOneBy({id});
    }

    async findOrCreate(id?: any, dto?: CreateAvatar2DDto): Promise<Avatar2D> {
        const avatar2D = this.avatar2DRepository.findOneBy({id});
        if (avatar2D) return avatar2D;
        return await this.create(dto);
    }

    async update(id?: any, dto?: UpdateAvatar2DDto): Promise<any> {
        return this.avatar2DRepository.save({
            id,
            ...dto,
        });
    }

    async updatePartial(id: any, dto?: UpdateAvatar2DDto): Promise<any> {
        const avatar2D = await this.findById(id);
        if (!avatar2D) throw new Error('Avatar2D not found');
        avatar2D.data = Buffer.from(dto?.data, 'base64');
        avatar2D.altTexts = dto?.altTexts;
        return this.avatar2DRepository.save(avatar2D);
    }


}

@Injectable()
export class MerchantService implements ICrud<Merchant, CreateMerchantDto, UpdateMerchantDto> {
    constructor(
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,
        @Inject(forwardRef(() => SocialLinkService))
        private readonly socialLinkService: SocialLinkService,
        @Inject(forwardRef(() => Avatar2DService))
        private readonly avatar2DService: Avatar2DService,
    ) {
    }

    async create(dto: CreateMerchantDto): Promise<Merchant> {
        // return await this.merchantRepository.save(dto);
        const avatar: Avatar2D = await this.avatar2DService.findOrCreate(dto.avatar?.id, dto.avatar);
        return await this.merchantRepository.save({
            name: dto.name,
            address: dto.address,
            description: dto.description,
            numberOfLikes: dto.numberOfLikes,
            numberOfProducts: dto.numberOfProducts,
            email: dto.email,
            slogan: dto.slogan,
            phone: dto.phone,
            avatar: avatar,
        });
    }

    async delete(id: any): Promise<any> {
        return await this.merchantRepository.delete(id);
    }


    async findAll({query}: any): Promise<Merchant[]> {
        const {relations, where} = query as IMerchantQuery;
        return this.merchantRepository
            .find({
                where,
                relations
            });
    }

    async findBy(option?: any): Promise<Merchant> {
        return await this.merchantRepository.findOneBy({
            ...option
        });
    }

    async update(id?: any, dto?: UpdateMerchantDto): Promise<any> {
        const socialLinks: SocialLink [] = await Promise.all(dto?.socialLinks.map(async (socialLink) => {
            return await this.socialLinkService.update(socialLink?.id, {
                data: socialLink?.data,
                provider: socialLink?.provider,
                merchantId: id,
            });
        }));

        return await this.merchantRepository.save({
            id,
            name: dto?.name,
            address: dto?.address,
            description: dto?.description,
            numberOfLikes: dto?.numberOfLikes,
            numberOfProducts: dto?.numberOfProducts,
            email: dto?.email,
            slogan: dto?.slogan,
            phone: dto?.phone,
            socialLinks,
        });
    }

    async updatePartial(id: any, dto?: UpdateMerchantDto): Promise<any> {
        if(dto.avatar) {
            await this.avatar2DService.update(dto.avatar.id, dto.avatar);
        }
        if (dto.socialLinks) {
            for (const socialLink of dto?.socialLinks) {
                await this.socialLinkService.findOrCreate(socialLink?.id, socialLink);
                await this.socialLinkService.update(socialLink?.id, {
                    merchantId: id,
                    data: socialLink.data,
                    provider: socialLink.provider,
                });
            }
        }

        return await this.merchantRepository.update(id, {
            id,
            name: dto?.name,
            address: dto?.address,
            description: dto?.description,
            numberOfLikes: dto?.numberOfLikes,
            numberOfProducts: dto?.numberOfProducts,
            email: dto?.email,
            slogan: dto?.slogan,
            phone: dto?.phone,
        });
    }

    async findAllByQuery({query}: any): Promise<Merchant[]> {
        const {limit, page, where, relations} = query as IMerchantQuery;
        const take = limit && Number(limit);
        const skip = page && Number(page) * take;
        return this.merchantRepository.find({
            where,
            take,
            skip,
            relations,
        })
    }
}