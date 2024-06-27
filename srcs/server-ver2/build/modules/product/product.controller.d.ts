import { ProductService } from "@app/modules/product/product.service";
import { CreateProductDTO, UpdateProductDTO } from "@app/modules/product";
import { IProductQuery } from "@app/modules/product/product.interface";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    list(query: IProductQuery): Promise<import("@app/modules/product").Product[]>;
    get(id: number, query: IProductQuery): Promise<import("@app/modules/product").Product>;
    getRelation(id: any, relation: string): Promise<any>;
    delete(id: any): Promise<any>;
    create(body: CreateProductDTO): Promise<import("@app/modules/product").Product>;
    replace(id: any, dto: UpdateProductDTO): Promise<import("@app/modules/product").Product>;
    update(id: number, dto: UpdateProductDTO): Promise<import("@app/modules/product").Product>;
}
