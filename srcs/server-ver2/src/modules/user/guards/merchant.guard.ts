import {CanActivate, Injectable} from "@nestjs/common";

@Injectable()
export class MerchantGuard implements CanActivate {
    async canActivate(
        context: any,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return request.user.id === request.params.id
            || request.user.email === request.params.email
            || request.user.email === request.body.email;
    }
}