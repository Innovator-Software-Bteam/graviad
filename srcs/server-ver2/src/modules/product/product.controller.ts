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
import {OwnerGuard, UpdateProductDto} from "@app/modules/product";
import {AuthGuard} from "@app/modules/auth";
import {IProductQuery} from "@app/modules/product/product.interface";

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {
    }

    @Get()
    async findAll(@Query() query: IProductQuery){
        return this.productService.findAll(query);
    }

    // get by query
    @Get('search')
    async findAllWithQuery(@Query() query: IProductQuery) {
        return this.productService.findAllByQuery(query);
    }

    @Get(':id')
    async findOne(@Param('id') id: any, @Query() query: IProductQuery){
        return this.productService.findBy({
            ...query,
            where: {
                id,
                ...query.where
            },
        });
    }


    @Delete(':id')
    @UseGuards(OwnerGuard)
    async delete(id: any) {
        return this.productService.delete(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() body: any) {
        return this.productService
            .create(body)
    }

    @Put(':id')
    // @UseGuards(OwnerGuard)
    async update(id: any, @Body() dto: UpdateProductDto) {
        return this.productService
            .update(id, dto)
    }

    @Patch(':id')
    // @UseGuards(OwnerGuard)
    async updatePartial(@Param('id') id: any, @Body() dto: UpdateProductDto) {
        return this.productService.updatePartial(id, dto)
    }
}
