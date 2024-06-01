import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ProductService } from '@app/modules/product';
import { MerchantService, UserService } from "@app/modules/user";

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
        const user = await this.userService.findBy(request.user.email);
        const productId = request.params.id;
        const merchant = await this.merchantService.findBy(user.email);
        if (!user || !merchant) {
            return false;
        }

        return this.productService.findBy(productId).then((product) => {
            return product && product.merchantId === merchant.id;
        });
    }
}