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
    Query, UseGuards
} from '@nestjs/common';
import {MerchantService, SocialLinkService, UserService} from "@app/modules/user";
import {CreateUserDto, UpdateMerchantDto} from "@app/modules/user";
import {IMerchantQuery, IUserQuery} from "@app/modules/user";
import {MerchantGuard, UserGuard} from "@app/modules/user/guards";
import {AuthGuard} from "@app/modules/auth";

@Controller('users')
export class UserController {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService) {
    }

    @Get()
    async findAll(@Query() query: IUserQuery) {
        return await this.userService
            .findAll({query});
    }

    @Get('search')
    async findAllWithQuery(@Query() query: IUserQuery) {
        return await this.userService
            .findAllByQuery(query);
    }

    @Get(':id')
    async findBy(@Param('id') id: string) {
        return await this.userService.findBy({
            id: id,
        });
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string, @Query() query: IUserQuery) {
        return await this.userService.findOneBy({
            email: email,
        }, query);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() body: CreateUserDto) {
        return await this.userService
            .create(body);
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
    async remove(@Param('id') id: string) {
        return await this.userService
            .delete(id)
    }
}

@Controller('merchants')
export class MerchantController {
    constructor(
        @Inject(forwardRef(() => MerchantService))
        private readonly merchantService: MerchantService,
        @Inject(forwardRef(() => SocialLinkService))
        private readonly socialLinkService: SocialLinkService) {
    }

    @Get()
    async findAll(@Query() query: IMerchantQuery) {
        return await this.merchantService
            .findAll(query);
    }

    @Get('search')
    async findAllWithQuery(@Query() query: IMerchantQuery) {
        return await this.merchantService
            .findAllByQuery(query)
    }

    @Get(':id')
    async findBy(@Param('id') id: string) {
        return await this.merchantService
            .findBy({
                id: id,
            })
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() body: any) {
        return this.merchantService
            .create(body)
    }


    @Put(':id')
    @UseGuards(AuthGuard)
    @UseGuards(MerchantGuard)
    async replace(@Param('id') id: string, @Body() body: UpdateMerchantDto) {
        console.log(id, body);
        if (!id || !body) {
            throw new BadRequestException('Email and body must be provided');
        }
        return await this.merchantService
            .update(id, {
                ...body,
            });
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    @UseGuards(MerchantGuard)
    async updatePartial(@Param('id') id: string, @Body() body: UpdateMerchantDto) {
        return this.merchantService
            .updatePartial(id, body)
    }

    @Delete(':email')
    @UseGuards(AuthGuard)
    @UseGuards(MerchantGuard)
    async remove(@Param('email') email: string) {
        return this.merchantService
            .delete(email)
            .then(() => this.socialLinkService.delete(email));
    }
}