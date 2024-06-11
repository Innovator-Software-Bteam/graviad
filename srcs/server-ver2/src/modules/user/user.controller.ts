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
import {MerchantService, SocialLinkService, UserService} from "@app/modules/user/user.service";
import {UserDto, UpdateMerchantDto} from "@app/modules/user/dto";
import {IMerchantQuery, IUserQuery} from "@app/modules/user/user.interface";
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
            .findAll(query);
    }

    @Get('search')
    async findAllWithQuery(@Query() query: IUserQuery) {
        return await this.userService
            .findAllByQuery({query});
    }

    @Get(':id')
    async findBy(@Param('id') id: string) {
        return await this.userService.findBy({
            where: {
                id: id,
            }
        });
    }

    @Get('email/:email')
    async findByEmail(@Param('email') email: string, @Query() query: IUserQuery) {
        return await this.userService.findOneBy({
            ...query,
            where: {
                email: email,
            }
        });
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() body: UserDto) {
        return await this.userService
            .create(body);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @UseGuards(UserGuard)
    async update(@Param('id') id: string, @Body() body: UserDto) {
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
    async findBy(@Param('id') id: string, @Query() query: IMerchantQuery) {
        return await this.merchantService
            .findById(id, query);
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
            .update(id, body);
    }

    @Patch(':id')
    // @UseGuards(AuthGuard)
    // @UseGuards(MerchantGuard)
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

@Controller('social-links')
export class SocialLinkController {
    constructor(
        @Inject(forwardRef(() => SocialLinkService))
        private readonly socialLinkService: SocialLinkService) {
    }

    @Get()
    async findAll() {
        return await this.socialLinkService
            .findAll();
    }

    @Get(':id')
    async findBy(@Param('id') id: number) {
        return await this.socialLinkService
            .findOne(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() body: any) {
        return await this.socialLinkService
            .create(body);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async replace(@Param('id') id: string, @Body() body: any) {
        return await this.socialLinkService
            .update(id, body);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async updatePartial(@Param('id') id: string, @Body() body: any) {
        return await this.socialLinkService
            .updatePartial(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async remove(@Param('id') id: string) {
        return await this.socialLinkService
            .delete(id);
    }
}