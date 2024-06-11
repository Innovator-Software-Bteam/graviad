import {BadRequestException, CanActivate, Injectable} from "@nestjs/common";

@Injectable()
export class MerchantGuard implements CanActivate {
    async canActivate(
        context: any,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            throw new BadRequestException('Unauthorized');
        }
        if(request.user.id!==request.params.id || request.user.email !== request.params.email || request.user.email !== request.body.email){
            throw new BadRequestException('Require owner permission');
        }
        return true;

    }
}