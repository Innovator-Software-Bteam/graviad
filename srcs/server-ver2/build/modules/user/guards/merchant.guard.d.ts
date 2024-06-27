import { CanActivate } from "@nestjs/common";
export declare class MerchantGuard implements CanActivate {
    canActivate(context: any): Promise<boolean>;
}
