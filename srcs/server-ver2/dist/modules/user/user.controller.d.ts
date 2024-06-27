import { UserService } from "@app/modules/user/user.service";
import { CreateUserDto } from "@app/modules/user/dto";
import { IUserQuery } from "@app/modules/user/user.interface";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    list(query: IUserQuery): Promise<import("./entities").User[]>;
    getRelation(id: string, relation: string): Promise<any>;
    search(query: IUserQuery): Promise<import("./entities").User>;
    get(id: string, query: IUserQuery): Promise<import("./entities").User>;
    create(body: CreateUserDto): Promise<import("./entities").User>;
    likeProduct(id: string, product_id: number): Promise<any>;
    unlikeProduct(id: string, product_id: number): Promise<any>;
    followMerchant(id: string, merchant_id: string): Promise<any>;
    unfollowMerchant(id: string, merchant_id: string): Promise<any>;
    update(id: string, body: CreateUserDto): Promise<any>;
    delete(id: string): Promise<any>;
}
