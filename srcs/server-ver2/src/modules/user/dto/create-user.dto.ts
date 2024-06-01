import {CreateMerchantDto} from "@app/modules/user/dto/create-merchant.dto";
import {TProfile} from "@app/modules/user";

/**
 * @version 2.0
 */
export class CreateUserDto {
    readonly email: string;
    readonly profile: TProfile;
    readonly merchant?: CreateMerchantDto;
}
export class UpdateUserDto {
    readonly email?: string;
}