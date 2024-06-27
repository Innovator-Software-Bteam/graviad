import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class UserGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return request.user.id === request.params.ida
            || request.user.email === request.params.email
            || request.user.email === request.body.email;
    }
}