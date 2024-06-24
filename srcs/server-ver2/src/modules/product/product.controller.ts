import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import {ProductService} from "@app/modules/product/product.service";
import {CreateProductDTO, UpdateProductDTO} from "@app/modules/product";
import {AuthGuard} from "@app/modules/auth";
import {IProductQuery} from "@app/modules/product/product.interface";

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {
    }

    @Get()
    async list(@Query() query: IProductQuery) {
        return this.productService.find(query);
    }

    @Get(':id')
    async get(@Param('id') id: number, @Query() query: IProductQuery) {
        const {relations, where} = query;
        return this.productService.findOne({
            where: {
                id: id,
                ...where,
            },
            relations,

        });
    }

    @Get(':id/:relation')
    async getRelation(@Param('id') id: any, @Param('relation') relation: string) {
        try {
            const product = await this.productService.findOne({
                where: {
                    id,
                },
                relations: [relation]
            });
            return product[relation];
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }


    @Delete(':id')
    // @UseGuards(OwnerGuard)
    async delete(id: any) {
        return this.productService.delete(id);
    }

    @Post()
    // @UseGuards(AuthGuard)
    async create(@Body() body: CreateProductDTO) {
        return this.productService
            .create(body)
    }

    @Put(':id')
    // @UseGuards(OwnerGuard)
    async replace(id: any, @Body() dto: UpdateProductDTO) {
        return this.productService
            .replace(id, dto)
    }

    @Patch(':id')
    // @UseGuards(OwnerGuard)
    async update(@Param('id') id: number, @Body() dto: UpdateProductDTO) {
        return this.productService.update(id, dto)
    }
}
