import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProductService } from '@app/modules/product';
import {UserService} from "@app/modules/user";
import {MerchantService} from "@app/modules/merchant";

@Injectable()
export class OwnerGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private productService: ProductService,
        private merchantService: MerchantService,
        private userService: UserService,
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if(!request.user) {
            return false;
        }
        const user = await this.userService.findOne({
            where:{
                email: request.user.email
            }
        });
        const productId = request.params.id;
        const merchant = await this.merchantService.findOne({
            where: {
                userId: user.id
            }
        });
        if (!user || !merchant) {
            return false;
        }

        return this.productService.findOne(productId).then((product) => {
            return product && product.merchantId === merchant.id;
        });
    }
}