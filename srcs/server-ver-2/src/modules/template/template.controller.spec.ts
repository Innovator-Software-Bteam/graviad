import {Test, TestingModule} from '@nestjs/testing';
import {TemplateController} from './template.controller';
import {INestApplication} from "@nestjs/common";
import {AppModule} from "../../app.module";
import request from "supertest";
import {CreateTemplateDTO} from "@app/modules/template/dto/template.dto";
import {ObjectType, TemplateType} from "@app/modules/template/template.interface";

describe('TemplateController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = module.createNestApplication();
        await app.init();
    });
    describe('TemplateController', () => {
        describe('get', () => {
            describe('find all', () => {
                it('TC1: return all templates', () => {
                    return request(app.getHttpServer())
                        .get('/templates')
                        .expect(200)
                        .expect((res) => {
                            res.body.forEach((template: any) => {
                                expect(template).toHaveProperty('id');
                                expect(template).toHaveProperty('name');
                            });
                        })
                });
            });
            describe('find by id', () => {
                // it('TC1: return template by id', async () => {
                //     try {
                //         return await request(app.getHttpServer())
                //             .get('/templates/1')
                //             .expect(200)
                //             .expect((res) => {
                //                 expect(res.body).toHaveProperty('id');
                //                 expect(res.body).toHaveProperty('name');
                //             });
                //     } catch (err) {
                //         console.log(err);
                //     }
                // });
            });
        });
    });
    describe('post', () => {
        describe('create', () => {
            it('TC1: create template', () => {
                return request(app.getHttpServer())
                    .post('/templates')
                    .send({
                        name: 'test',
                        description: 'test',
                        brief: 'test',
                        objectType: ObjectType.PRODUCT_VIEW,
                        templateType: TemplateType.DEFAULT,
                    } as CreateTemplateDTO)
                    .expect(201)
                    .expect((res) => {
                        expect(res.body).toHaveProperty('name');
                        expect(res.body).toHaveProperty('description');
                        expect(res.body).toHaveProperty('brief');
                        expect(res.body).toHaveProperty('objectType');
                        expect(res.body).toHaveProperty('templateType');
                    })
            });
        });
    });
});
