import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from "@nestjs/common";
import {AppModule} from "../../app.module";
import request from "supertest";
import {CreateMerchantDto} from "@app/modules/merchant/dto";

describe('MerchantController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });
    describe('MerchantController', () => {
        describe('get', () => {
            describe('find all', () => {
                it('TC1: return all merchants', () => {
                    return request(app.getHttpServer())
                        .get('/merchants')
                        .expect(200)
                        .expect((res) => {
                            res.body.forEach((merchant: any) => {
                                expect(merchant).toHaveProperty('id');
                                expect(merchant).toHaveProperty('name');
                            });
                        })
                });
            });
            describe('find by id', () => {
                it('TC1: return merchant by id', () => {
                    return request(app.getHttpServer())
                        .get('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45')
                        .expect(200)
                        .expect((res) => {
                            expect(res.body).toHaveProperty('id');
                            expect(res.body).toHaveProperty('name');
                        })
                });
                it('TC2: return merchant with relation social links', () => {
                    return request(app.getHttpServer())
                        .get('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45/socialLinks')
                        .expect(200)
                        .expect((res) => {
                            res.body.forEach((socialLink: any) => {
                                expect(socialLink).toHaveProperty('id');
                                expect(socialLink).toHaveProperty('provider');
                                expect(socialLink).toHaveProperty('data');
                            });
                        });
                });
                it('TC3: return merchant with relation avatar', () => {
                    return request(app.getHttpServer())
                        .get('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45/avatar')
                        .expect(200)
                });
            });
        });
        describe('patch', () => {
            describe('update', () => {
                it('TC1: Update avatar', () => {
                    return request(app.getHttpServer())
                        .patch('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45')
                        .send({
                            avatar: {
                                data: 'data1',
                                merchantId: 'cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45'
                            }
                        })
                        .expect(200)
                });
                it('TC2: Update basic property', () => {
                    return request(app.getHttpServer())
                        .patch('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45')
                        .send({
                            name: 'new name',
                            address: 'new address',
                            phone: 'new phone',
                            slogan: 'new slogan',
                            description: 'new description',
                            email: 'new email',
                            numberOfLikes: 100,
                            numberOfProducts: 100
                        } as CreateMerchantDto)
                        .expect(200)
                        .expect((res) => {
                            expect(res.body).toHaveProperty('id');
                            expect(res.body).toHaveProperty('name', 'new name');
                            expect(res.body).toHaveProperty('address', 'new address');
                            expect(res.body).toHaveProperty('phone', 'new phone');
                            expect(res.body).toHaveProperty('slogan', 'new slogan');
                            expect(res.body).toHaveProperty('description', 'new description');
                            expect(res.body).toHaveProperty('email', 'new email');
                            expect(res.body).toHaveProperty('numberOfLikes', 100);
                        });
                });
                it('TC3: Update partial property', () => {
                    return request(app.getHttpServer())
                        .patch('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45')
                        .send({
                            name: 'new name',
                        } as CreateMerchantDto)
                        .expect(200)
                        .expect((res) => {
                            expect(res.body).toHaveProperty('id');
                            expect(res.body).toHaveProperty('name', 'new name');
                        });
                });
                it('TC4: Test update social links', () => {
                    return request(app.getHttpServer())
                        .patch('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45')
                        .send({
                            socialLinks: [{
                                provider: 'facebook',
                                data: 'test123facebook.com'
                            }]
                        } as CreateMerchantDto)
                        .expect(res=>{
                            return res.statusCode === 200 || res.statusCode === 201;
                        })

                });
                it('TC5: Test validation', () => {
                    return request(app.getHttpServer())
                        .patch('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45')
                        .send({
                            name: "",
                        } as CreateMerchantDto)
                        .expect(res=>{
                            return res.statusCode === 400;
                        });
                });
                // it('TC6: Test not found', () => {
                //     return request(app.getHttpServer())
                //         .patch('/merchants/123')
                //         .send({
                //             name: 'new name',
                //         } as CreateMerchantDto)
                //         .expect(404);
                // });
            });
        });
    });
});