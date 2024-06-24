import {
    BadRequestException,
    Body,
    Controller, Delete,
    forwardRef,
    Get,
    Inject,
    Param, Patch,
    Post,
    Put,
    Query,
    UseGuards
} from "@nestjs/common";
import {AuthGuard} from "@app/modules/auth";
import {MerchantService, SocialLinkService} from "./merchant.service";
import {IMerchantQuery} from "./merchant.interface";
import {UpdateMerchantDto} from "./dto";


@Controller('merchants')
export class MerchantController {
    constructor(
        @Inject(forwardRef(() => MerchantService))
        private readonly merchantService: MerchantService,
        @Inject(forwardRef(() => SocialLinkService))
        private readonly socialLinkService: SocialLinkService) {
    }

    @Get()
    async list(@Query() query: IMerchantQuery) {
        return await this.merchantService
            .find(query);
    }

    @Get(':id')
    async findBy(@Param('id') id: string, @Query() query: IMerchantQuery) {
        return await this.merchantService
            .findOne({
                ...query,
                where: {
                    id,
                    ...query.where
                },
            });
    }

    @Get(':id/:relation')
    async getRelation(@Param('id') id: string, @Param('relation') relation: string) {
        try {
            const merchant = await this.merchantService.findOne({
                where: {
                    id,
                },
                relations: [relation],
            });
            return merchant[relation];
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() body: any) {
        return this.merchantService
            .create(body)
    }
    @Post(':id/add-template/:templateId')
    @UseGuards(AuthGuard)
    async addTemplate(@Param('id') id: string, @Param('templateId') templateId: number) {
        return this.merchantService
            .addTemplate(id, templateId)
    }

    @Post(':id/remove-template/:templateId')
    @UseGuards(AuthGuard)
    async removeTemplate(@Param('id') id: string, @Param('templateId') templateId: number) {
        return this.merchantService
            .removeTemplate(id, templateId)
    }


    @Put(':id')
    @UseGuards(AuthGuard)
    // @UseGuards(MerchantGuard)
    async replace(@Param('id') id: string, @Body() body: UpdateMerchantDto) {
        console.log(id, body);
        if (!id || !body) {
            throw new BadRequestException('Email and body must be provided');
        }
        return await this.merchantService
            .replace(id, body);
    }

    @Patch(':id')
    // @UseGuards(AuthGuard)
    // @UseGuards(MerchantGuard)
    async update(@Param('id') id: string, @Body() body: UpdateMerchantDto) {
        return this.merchantService
            .update(id, body)
    }

    @Delete(':email')
    @UseGuards(AuthGuard)
    // @UseGuards(MerchantGuard)
    async remove(@Param('email') email: string) {
        return this.merchantService
            .delete(email)
            .then(() => this.socialLinkService.delete(email));
    }

}

