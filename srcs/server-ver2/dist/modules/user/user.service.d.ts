import { IDatabaseCRUD, IQuery } from "@app/interfaces";
import { Profile, User } from "./entities";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto, CreateProfileDTO, UpdateProfileDTO } from "./dto";
import { IUserAction, IUserQuery } from "./index";
import { ProductService } from "@app/modules/product";
import { MerchantService } from "@app/modules/merchant";
export declare class ProfileService implements IDatabaseCRUD<Profile, CreateProfileDTO, UpdateProfileDTO> {
    private readonly profileRepository;
    constructor(profileRepository: Repository<Profile>);
    create(dto?: CreateProfileDTO): Promise<Profile>;
    delete(id: any): Promise<any>;
    findOrCreate(id?: any, dto?: CreateProfileDTO): Promise<Profile>;
}
export declare class UserService implements IDatabaseCRUD<User, CreateUserDto, UpdateUserDto>, IUserAction {
    private readonly userRepository;
    private readonly productService;
    private readonly merchantService;
    constructor(userRepository: Repository<User>, productService: ProductService, merchantService: MerchantService);
    create(dto?: CreateUserDto): Promise<User>;
    delete(id: any): Promise<any>;
    find(query: IQuery): Promise<User[]>;
    findOne(query: IUserQuery): Promise<User>;
    replace(id: any, dto?: UpdateUserDto): Promise<any>;
    update(id: any, dto?: UpdateUserDto): Promise<any>;
    findOrCreate(id?: any, dto?: CreateUserDto): Promise<User>;
    findOrCreateByEmail(email: string, dto?: CreateUserDto): Promise<User>;
    likeProduct(userId: string, productId: number): Promise<any>;
    unlikeProduct(userId: string, productId: number): Promise<any>;
    followMerchant(userId: string, merchantId: string): Promise<any>;
    unfollowMerchant(userId: string, merchantId: string): Promise<any>;
}
