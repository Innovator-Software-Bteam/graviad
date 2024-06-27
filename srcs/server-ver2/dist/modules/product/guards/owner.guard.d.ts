import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductService } from '@app/modules/product';
import { UserService } from "@app/modules/user";
import { MerchantService } from "@app/modules/merchant";
export declare class OwnerGuard implements CanActivate {
    private reflector;
    private productService;
    private merchantService;
    private userService;
    constructor(reflector: Reflector, productService: ProductService, merchantService: MerchantService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
