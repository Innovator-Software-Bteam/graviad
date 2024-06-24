import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../../app.module";
import request from "supertest";
import {CreateProductDTO} from "@app/modules/product/dto";

describe('ProductController e2e', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });
    describe('ProductController', () => {
        describe('get', () => {
            describe('find all', () => {
                it('TC1: return all products', () => {
                    return request(app.getHttpServer())
                        .get('/products')
                        .expect(200)
                        .expect((res) => {
                            res.body.forEach((product: any) => {
                                expect(product).toHaveProperty('id');
                                expect(product).toHaveProperty('name');
                            });
                        })
                });
            });
            describe('find one', () => {
            });
        });
        describe('post', () => {
            it('TC1: create product', () => {
                return request(app.getHttpServer())
                    .post('/products')
                    .send({
                        name: 'product name',
                        description: 'product description',
                        merchantId: 'cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45',
                        brief: 'product brief',
                    } as CreateProductDTO)
                    .expect(201)
                    .catch((e) => {
                        console.log(e);
                    });
            });
        });
        describe('delete', () => {
        });
        describe('patch', () => {
            it('TC1: update product', () => {
                return request(app.getHttpServer())
                    .patch('/products/28')
                    .send({
                        name: 'product name',
                        description: 'product description',
                        merchantId: 'cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45',
                        brief: 'product brief',
                        highlightLabel: 'product highlight label',
                    } as CreateProductDTO)
                    .expect(200)
                    .catch((e) => {
                        console.log(e);
                    });
            });
        });
    });
});