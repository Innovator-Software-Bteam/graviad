import {BadRequestException, forwardRef, Inject, Injectable} from "@nestjs/common";
import {ICrud, IDatabaseCRUD, IQuery} from "@app/interfaces";
import {Profile, User} from "./entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {
    UserDto,
    UpdateUserDto,
} from "./dto";
import {IUserAction, IUserQuery, TProfile} from "./index";
import {query} from "express";
import {ProductService} from "@app/modules/product";
import {MerchantService} from "@app/modules/merchant";
import * as console from "node:console";

@Injectable()
export class ProfileService implements IDatabaseCRUD<Profile, TProfile> {
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

    async findBy(query: IQuery): Promise<Profile> {
        const {where} = query;
        return await this.profileRepository.findOneBy(where);
    }

    async findOrCreate(id?: any, dto?: TProfile): Promise<Profile> {
        const profile = await this.profileRepository.findOneBy({id});
        if (profile) return profile;
        return await this.profileRepository.save(dto);
    }
}

@Injectable()
export class UserService implements IDatabaseCRUD<User, UserDto, UpdateUserDto>,
    IUserAction {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(forwardRef(() => ProductService))
        private readonly productService: ProductService,
        @Inject(forwardRef(() => MerchantService))
        private readonly merchantService: MerchantService,
    ) {


    }

    async create(dto?: UserDto): Promise<User> {
        if (dto?.id) throw new Error('Id is exist, please use update method');
        const user: User = new User();
        user.email = dto.email;
        return await this.userRepository.save(dto);
    }

    async delete(id: any): Promise<any> {
        return await this.userRepository.delete(id);
    }

    async find(query: IQuery): Promise<User[]> {
        return await this.userRepository.find(query);
    }


    async findOne(query: IUserQuery): Promise<User> {
        return await this.userRepository.findOne(query);
    }

    async replace(id: any, dto?: UpdateUserDto): Promise<any> {
        return await this.userRepository.save({
            id,
            email: dto.email,
        });
    }

    async update(id: any, dto?: UpdateUserDto): Promise<any> {
        if (!id) throw new Error('id is required');
        await this.userRepository.update(id, dto);
        return await this.userRepository.findOneBy({id});
    }

    async findOrCreate(id?: any, dto?: UserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({id});
        if (user) return user;
        return this.create(dto);
    }

    async findOrCreateByEmail(email: string, dto?: UserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({
            email
        });
        if (user) return user;
        return this.create(dto);
    }

    async likeProduct(userId: string, productId: number): Promise<any> {
        const user = await this.findOne({
            where: {
                id: userId
            },
        });
        const product = await this.productService.findOne({
            where: {id: productId},
            relations: ['likedBy']
        });
        if (!user || !product) throw new BadRequestException('User or Product not found');
        if(!product.likedBy) product.likedBy = [];
        product.likedBy.push(user);

        const p = await this.productService.update(productId, {
            numberOfLikes: product.numberOfLikes + 1,
            likedBy: product.likedBy,
        });
        return await this.userRepository.save(user);
    }

    async unlikeProduct(userId: string, productId: number): Promise<any> {
        const user = await this.findOne({
            where: {
                id: userId
            },
        });
        const product = await this.productService.findOne({
            where: {
                id: productId
            },
            relations: ['likedBy']
        });
        if (!user || !product) throw new BadRequestException('User or Product not found');
        // user.likedProducts = user.likedProducts || [];


        // user.likedProducts = user.likedProducts.filter(p => p.id !== productId);
        product.likedBy = product.likedBy.filter(u => u.id !== userId) || [];
        const p = await this.productService.update(productId, {
            numberOfLikes: product.numberOfLikes - 1,
            likedBy: product.likedBy,
        });
        console.log('p', p);
        return await this.userRepository.save(user);
    }

    async followMerchant(userId: string, merchantId: string): Promise<any> {
        const user = await this.findOne({
            where: {
                id: userId
            },
            relations: ['followingMerchants']
        });
        const merchant = await this.merchantService.findOne({
            where: {
                id: merchantId
            },
            relations: ['followers']
        });
        if (!user || !merchant) throw new BadRequestException('User or Merchant not found');
        user.followingMerchants = user.followingMerchants || [];
        user.followingMerchants.push(merchant);
        return await this.userRepository.save(user);
    }

    async unfollowMerchant(userId: string, merchantId: string): Promise<any> {
        const user = await this.findOne({
            where: {
                id: userId
            },
            relations: ['followingMerchants']
        });
        const merchant = await this.merchantService.findOne({
            where: {
                id: merchantId
            },
            relations: ['followers']
        });
        if (!user || !merchant) throw new BadRequestException('User or Merchant not found');
        user.followingMerchants = user.followingMerchants || [];
        merchant.followers = merchant.followers || [];
        user.followingMerchants = user.followingMerchants.filter(m => m.id !== merchantId);
        merchant.followers = merchant.followers.filter(u => u.id !== userId);
        return await this.userRepository.save(user);
    }
}
