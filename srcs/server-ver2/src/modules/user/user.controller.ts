import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    forwardRef,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Query, UseGuards
} from '@nestjs/common';
import {MerchantService, SocialLinkService, UserService} from "@app/modules/user";
import {UpdateMerchantDto} from "@app/modules/user/dto/create-merchant.dto";
import {CreateUserDto} from "@app/modules/user/dto";
import {AuthGuard} from "@app/modules/auth";

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService) {
    }

    @Get()
    async findAll() {
        return await this.userService
            .findAll()
            .catch((e) => {
                throw new BadRequestException(e);
            });
    }

    @Get('search')
    async findAllWithQuery(@Query() query: any) {
        return await this.userService
            .findAllByQuery(query)
            .catch((e) => {
                throw new BadRequestException(e);
            });
    }

    @Get(':id')
    async findBy(@Param('id') id: string) {
        return await this.userService.findBy({
            id: id,
        });
    }

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService
            .create(body)
            .catch((e) => {
                throw new BadRequestException(e);
            });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: CreateUserDto) {
        return await this.userService
            .update(id, body)
            .catch((e) => {
                throw new BadRequestException(e);
            });
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService
            .delete(id)
            .catch((e) => {
                throw new BadRequestException(e);
            });
    }
}

@UseGuards(AuthGuard)
@Controller('merchants')
export class MerchantController {
    constructor(
        @Inject(forwardRef(() => MerchantService))
        private readonly merchantService: MerchantService,
        @Inject(forwardRef(() => SocialLinkService))
        private readonly socialLinkService: SocialLinkService) {
    }

    @Get()
    async findAll() {
        return await this.merchantService
            .findAll()
            .catch((e) => {
                throw new BadRequestException(e);
            });
    }

    @Get('search')
    async findAllWithQuery(@Query() query: any) {
        return await this.merchantService
            .findAllByQuery(query)
            .catch((e) => {
                throw new BadRequestException(e);
            });
    }

    @Get(':id')
    async findBy(@Param('id') id: string) {
        return await this.merchantService
            .findBy({
                id: id,
            })
            .catch((e) => {
                throw new BadRequestException(e);
            });

    }

    @Post()
    async create(@Body() body: any) {
        return this.merchantService
            .create(body)
            .catch((e) => {
                throw new BadRequestException(e);
            });
    }


    @Put(':id')
    async replace(@Param('id') id: string, @Body() body: UpdateMerchantDto) {
        console.log(id, body);
        if (!id || !body) {
            throw new BadRequestException('Email and body must be provided');
        }
        return await this.merchantService
            .update(id, {
                ...body,
            })
            .catch((e) => {
                console.log('eror update merchant', e);
                throw new BadRequestException(e);
            });
    }

    @Delete(':email')
    async remove(@Param('email') email: string) {
        return this.merchantService
            .delete(email)
            .then(() => this.socialLinkService.delete(email))
            .catch((e) => {
                throw new BadRequestException(e);
            });
    }
}