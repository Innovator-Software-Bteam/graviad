import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    forwardRef,
    Get,
    Inject, Param, Patch,
    Post,
    Put,
    Query, Search, UseGuards
} from '@nestjs/common';
import {UserService} from "@app/modules/user/user.service";
import {CreateUserDto} from "@app/modules/user/dto";
import {IUserQuery} from "@app/modules/user/user.interface";
import {UserGuard} from "@app/modules/user/guards";
import {AuthGuard} from "@app/modules/auth";

@Controller('users')
export class UserController {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService) {
    }

    @Get()
    async list(@Query() query: IUserQuery) {
        return await this.userService
            .find(query);
    }



    @Get(':id/:relation')
    async getRelation(@Param('id') id: string, @Param('relation') relation: string) {
        try {
            const user = await this.userService.findOne({
                where: {
                    id,
                },
                relations: [relation]
            });
            return user[relation];
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get('search')
    async search(@Query() query: IUserQuery) {
        return await this.userService
            .findOne(query);
    }

    @Get(':id')
    async get(@Param('id') id: string, @Query() query: IUserQuery) {
        return await this.userService.findOne({
            ...query,
            where: {
                id: id,
                ...query.where
            }
        });
    }

    @Post()
    // @UseGuards(AuthGuard)
    async create(@Body() body: CreateUserDto) {
        return await this.userService
            .create(body);
    }

    @Post(':id/like_product/:product_id')
    // @UseGuards(AuthGuard)
    async likeProduct(@Param('id') id: string, @Param('product_id') product_id: number) {
        return await this.userService
            .likeProduct(id, product_id);
    }
    @Post(':id/unlike_product/:product_id')
    // @UseGuards(AuthGuard)
    async unlikeProduct(@Param('id') id: string, @Param('product_id') product_id: number) {
        return await this.userService
            .unlikeProduct(id, product_id);
    }

    @Post(':id/follow_merchant/:merchant_id')
    // @UseGuards(AuthGuard)
    async followMerchant(@Param('id') id: string, @Param('merchant_id') merchant_id: string) {
        return await this.userService
            .followMerchant(id, merchant_id);
    }

    @Delete(':id/unfollow_merchant/:merchant_id')
    // @UseGuards(AuthGuard)
    async unfollowMerchant(@Param('id') id: string, @Param('merchant_id') merchant_id: string) {
        return await this.userService
            .unfollowMerchant(id, merchant_id);
    }
    @Put(':id')
    @UseGuards(AuthGuard)
    @UseGuards(UserGuard)
    async update(@Param('id') id: string, @Body() body: CreateUserDto) {
        return await this.userService
            .update(id, body)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @UseGuards(UserGuard)
    async delete(@Param('id') id: string) {
        return await this.userService
            .delete(id)
    }
}
