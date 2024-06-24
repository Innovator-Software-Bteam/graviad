import {Test, TestingModule} from "@nestjs/testing";
import request from 'supertest';
import {INestApplication} from "@nestjs/common";
import {AppModule} from "../../app.module";

describe('UserController (e2e)', () => {
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
            describe('find one', () => {
                it('TC1: return user by id', () => {
                    return request(app.getHttpServer())
                        .get('/users/a8006e8a-1ca1-4088-ae6a-fa2c11e04a15')
                        .expect(200)
                        .expect((res) => {
                            expect(res.body).toHaveProperty('id');
                            expect(res.body).toHaveProperty('email');
                        })
                });
            });
        });
        describe('post', () => {
            describe('action', () => {
                it('TC1: User liked product', () => {
                    return request(app.getHttpServer())
                        .post('/users/a8006e8a-1ca1-4088-ae6a-fa2c11e04a15/like_product/38')
                        .expect(res=>{
                            expect([200, 201]).toContain(res.status);
                        });
                });
                it('TC2: User unliked product', () => {
                    return request(app.getHttpServer())
                        .post('/users/a8006e8a-1ca1-4088-ae6a-fa2c11e04a15/unlike_product/38')
                        .expect(res=>{
                            expect([200, 201]).toContain(res.status);
                        });
                });
            });
        });
    });
});

