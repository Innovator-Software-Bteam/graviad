import {Test, TestingModule} from "@nestjs/testing";
import request from 'supertest';
import {INestApplication} from "@nestjs/common";
import {AppModule} from "../../app.module";
import {MerchantDto, CreateSocialLinkDto} from "@app/modules/user/dto";
import {IQuery} from "@app/interfaces";

describe('UserController', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });
    describe('UserController', () => {
        describe('get', () => {
            describe('find all', () => {
                it('TC1: return all users', () => {
                    return request(app.getHttpServer())
                        .get('/users')
                        .expect(200)
                        .expect((res) => {
                            res.body.forEach((user: any) => {
                                expect(user).toHaveProperty('id');
                                expect(user).toHaveProperty('email');
                            });
                        })
                });
            });
        });
    });
    describe('SocialLinksController', () => {
        describe('get', () => {
            describe('find all', () => {
                it('TC1: return all social links', () => {
                    return request(app.getHttpServer())
                        .get('/social-links')
                        .expect(200)
                        .expect((res) => {
                            res.body.forEach((socialLink: CreateSocialLinkDto) => {
                                expect(socialLink).toHaveProperty('id');
                                expect(socialLink).toHaveProperty('provider');
                                expect(socialLink).toHaveProperty('data');
                            });
                        })
                });
            });
            describe('find one by', () => {
                it('TC1: return social link by id', () => {
                    return request(app.getHttpServer())
                        .get('/social-links/3')
                        .expect(200)
                        .expect((res) => {
                            expect(res.body).toHaveProperty('id');
                            expect(res.body).toHaveProperty('provider');
                            expect(res.body).toHaveProperty('data');
                        })
                });
            });
        });
    });
    describe('MerchantController', () => {
        describe('get', () => {
            describe('find all', () => {
                it('TC1: return all merchants with relation socialLinks', () => {
                    return request(app.getHttpServer())
                        .get('/merchants')
                        .query({
                            limit: 10,
                            relations: ['socialLinks', 'avatar']
                        })
                        .expect(200)
                        .expect((res) => {
                            res.body.forEach((merchant: MerchantDto) => {
                                expect(merchant).toHaveProperty('id');
                                expect(merchant).toHaveProperty('name');
                                expect(merchant).toHaveProperty('email');
                                expect(merchant).toHaveProperty('description');
                                expect(merchant).toHaveProperty('slogan');
                                expect(merchant).toHaveProperty('address');
                                expect(merchant).toHaveProperty('phone');

                                expect(merchant).toHaveProperty('socialLinks');
                                expect(merchant).toHaveProperty('avatar');
                            });
                        })
                });
            });
            describe('find one by', () => {
                it('TC1: return merchant by id', () => {
                    return request(app.getHttpServer())
                        .get('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45')
                        .query({
                            relations: ['socialLinks', 'avatar']
                        })
                        .expect(200)
                        .expect((res) => {
                            expect(res.body).toHaveProperty('id');
                            expect(res.body).toHaveProperty('name');
                            expect(res.body).toHaveProperty('email');
                            expect(res.body).toHaveProperty('description');
                            expect(res.body).toHaveProperty('slogan');
                            expect(res.body).toHaveProperty('address');
                            expect(res.body).toHaveProperty('phone');

                            expect(res.body).toHaveProperty('socialLinks');
                            expect(res.body).toHaveProperty('avatar');
                        })
                });
            });
        });
        describe('patch', () => {
            it('TC1: update merchant', () => {
                return request(app.getHttpServer())
                    .patch('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45')
                    .send({
                        name: 'new name',
                        address: 'new address',
                        phone: 'new phone',
                        description: 'new description',
                        slogan: 'new slogan',
                        numberOfLikes: 10,
                        numberOfProducts: 10,
                    } as MerchantDto)
                    .expect(200)
                    .expect((res) => {
                        expect(res.body).toHaveProperty('id');
                        expect(res.body).toHaveProperty('name', 'new name');
                        expect(res.body).toHaveProperty('description', 'new description');
                        expect(res.body).toHaveProperty('slogan', 'new slogan');
                        expect(res.body).toHaveProperty('address', 'new address');
                        expect(res.body).toHaveProperty('phone', 'new phone');
                        expect(res.body).toHaveProperty('numberOfLikes', 10);
                        expect(res.body).toHaveProperty('numberOfProducts', 10);
                    })
            });
            it('TC2: update merchant social links', () => {
                return request(app.getHttpServer())
                    .patch('/merchants/cbcc5ac5-109c-4c7b-ad01-65f3c9e6cd45')
                    .send({
                        socialLinks: [
                            {
                                id: 49,
                                provider: 'facebook',
                                data: 'https://facebook.com'
                            }
                        ] as CreateSocialLinkDto[],
                    } as MerchantDto)
                    .expect(200)
                    .expect((res) => {
                        expect(res.body).toHaveProperty('id');
                        expect(res.body).toHaveProperty('socialLinks');
                        expect(res.body.socialLinks.some(link =>
                            link.id === 49 &&
                            link.provider === 'facebook' &&
                            link.data === 'https://facebook.com'
                        )).toBe(true);
                    })
            });
        });
    });
});

