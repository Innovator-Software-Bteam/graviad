import {BadRequestException, forwardRef, Inject, Injectable} from "@nestjs/common";
import {IDatabaseCRUD, IQuery} from "@app/interfaces";
import {
    CreateAvatarDTO,
    CreateSocialLinkDto,
    CreateMerchantDto,
    UpdateAvatarDTO,
    UpdateMerchantDto,
    UpdateSocialLinkDto
} from "./dto";
import {Avatar, Merchant, SocialLink} from "./entities";

import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {IMerchantAction} from "@app/modules/merchant/merchant.interface";
import {TemplateService} from "@app/modules/template/template.service";
import {query} from "express";
import {UserService} from "@app/modules/user";

@Injectable()
export class SocialLinkService implements IDatabaseCRUD<SocialLink, CreateSocialLinkDto, UpdateSocialLinkDto> {
    constructor(
        @InjectRepository(SocialLink)
        private readonly socialLinkRepository: Repository<SocialLink>
    ) {
    }

    async create(dto: CreateSocialLinkDto): Promise<SocialLink> {
        const socialLink: SocialLink = new SocialLink();
        socialLink.provider = dto.provider;
        socialLink.data = dto.data;
        return await this.socialLinkRepository.save(socialLink);
    }

    async delete(id: any): Promise<any> {
        return await this.socialLinkRepository.delete(id);
    }

    async findOne(query: IQuery): Promise<SocialLink> {
        return await this.socialLinkRepository.findOne(query);
    }

    async update(id?: any, dto?: UpdateSocialLinkDto): Promise<any> {
        if (!id) throw new BadRequestException('Id is required');
        const socialLink: SocialLink = await this.findOne({where: {id}});
        if (!socialLink) throw new BadRequestException('Social link not found');
        socialLink.provider = dto.provider;
        socialLink.data = dto.data;
        return await this.socialLinkRepository.save(socialLink);
    }

    async find(query: IQuery): Promise<SocialLink[]> {
        return await this.socialLinkRepository.find(query);
    }

    async replace(id: number, dto?: CreateSocialLinkDto): Promise<SocialLink> {
        if (!id) throw new BadRequestException('Id is required');
        const socialLink: SocialLink = await this.findOne({where: {id}});
        if (!socialLink) throw new BadRequestException('Social link not found');
        socialLink.provider = dto.provider;
        socialLink.data = dto.data;
        return await this.socialLinkRepository.save(socialLink);
    }

}

@Injectable()
export class AvatarService implements IDatabaseCRUD<Avatar, CreateAvatarDTO, UpdateAvatarDTO> {
    constructor(
        @InjectRepository(Avatar)
        private readonly avatar2DRepository: Repository<Avatar>
    ) {
    }

    async create(dto?: CreateAvatarDTO): Promise<Avatar> {
        const avatar2D: Avatar = new Avatar();
        if (!dto.data) throw new BadRequestException('Data is required');
        if (!dto.merchantId) throw new BadRequestException('Merchant id is required');
        const dataTransfer = Buffer.from(dto.data, 'base64');
        avatar2D.data = dataTransfer;
        avatar2D.altTexts = dto.altTexts;
        avatar2D.merchantId = dto.merchantId;
        return await this.avatar2DRepository.save(avatar2D);
    }

    async delete(id: any): Promise<any> {
        if (!id) throw new BadRequestException('Id is required');
        return await this.avatar2DRepository.delete(id);
    }

    async update(id?: any, dto?: UpdateAvatarDTO): Promise<any> {
        if (!id) throw new BadRequestException('Id is required');
        const avatar: Avatar = await this.avatar2DRepository.findOne({where: {id}});
        if (!avatar) throw new BadRequestException('Avatar not found');
        const dataTransfer = Buffer.from(dto.data, 'base64');
        avatar.data = dataTransfer;
        console.log('dataTransfer', dataTransfer)
        avatar.altTexts = dto.altTexts;
        avatar.merchantId = dto.merchantId;
        return await this.avatar2DRepository.save(avatar);
    }

    async find(query: IQuery): Promise<Avatar[]> {
        return await this.avatar2DRepository.find(query);
    }

    async findOne(query: IQuery): Promise<Avatar> {
        return await this.avatar2DRepository.findOne(query);
    }

    async replace(id: string | number, dto?: CreateAvatarDTO): Promise<Avatar> {
        if (!id) throw new BadRequestException('Id is required');
        const avatar: Avatar = await this.findOne({where: {id}});
        if (!avatar) throw new BadRequestException('Avatar not found');
        avatar.data = dto.data;
        avatar.altTexts = dto.altTexts;
        avatar.merchantId = dto.merchantId;
        return await this.avatar2DRepository.save(avatar);
    }


}

@Injectable()
export class MerchantService implements IDatabaseCRUD<Merchant, CreateMerchantDto, UpdateMerchantDto>, IMerchantAction {
    constructor(
        @InjectRepository(Merchant)
        private readonly merchantRepository: Repository<Merchant>,
        @Inject(forwardRef(() => SocialLinkService))
        private readonly socialLinkService: SocialLinkService,
        @Inject(forwardRef(() => AvatarService))
        private readonly avatar2DService: AvatarService,
        @Inject(forwardRef(() => TemplateService))
        private readonly templateService: TemplateService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {
    }

    async create(dto: CreateMerchantDto): Promise<Merchant> {
        if (!dto.userId) throw new BadRequestException('User id is required');
        const user = await this.userService.findOne({
            where:
                {
                    id: dto.userId
                }
        });
        if (!user) throw new BadRequestException('User not found');
        let merchant = new Merchant();
        if (dto.name) merchant.name = dto.name;
        if (dto.address) merchant.address = dto.address;
        if (dto.description) merchant.description = dto.description;
        if (dto.slogan) merchant.slogan = dto.slogan;
        if (dto.phone) merchant.phone = dto.phone;
        if (dto.email) merchant.email = dto.email;
        merchant= await this.merchantRepository.save(merchant);
        await this.userService.update(user.id, {
            merchantId: merchant.id
        });
        return merchant;
    }

    async delete(id: any): Promise<any> {
        return await this.merchantRepository.delete(id);
    }

    async find(query: IQuery): Promise<Merchant[]> {
        return await this.merchantRepository.find(query);
    }

    async findOne(query: IQuery): Promise<Merchant> {
        return await this.merchantRepository.findOne(query);
    }


    async replace(id?: any, dto?: UpdateMerchantDto): Promise<any> {
        const socialLinks: SocialLink [] = await Promise.all(dto?.socialLinks.map(async (socialLink) => {
            return await this.socialLinkService.update(socialLink?.id, {
                data: socialLink?.data,
                provider: socialLink?.provider,
                merchantId: id,
            });
        }));

        return await this.merchantRepository.save({
            id,
            name: dto?.name,
            address: dto?.address,
            description: dto?.description,
            numberOfLikes: dto?.numberOfLikes,
            numberOfProducts: dto?.numberOfProducts,
            slogan: dto?.slogan,
            phone: dto?.phone,
            socialLinks,
        });
    }

    async update(id: string, dto?: UpdateMerchantDto): Promise<any> {
        if (!id) throw new BadRequestException('Id is required');
        const merchant: Merchant = await this.findOne({where: {id}});
        if (!merchant) throw new BadRequestException('Merchant not found');
        if (dto.avatar && dto.avatar.data) {
            let avatar = await this.avatar2DService.findOne({
                where: {
                    merchantId: id,
                },
            });
            if (!avatar) {
                avatar = await this.avatar2DService.create(dto.avatar);
            } else {
                avatar = await this.avatar2DService.update(avatar.id, dto.avatar);
            }
            merchant.avatar = avatar;

        }
        if (dto.socialLinks && dto.socialLinks.length > 0) {
            const socialLinks: SocialLink[] = [];
            for (const socialLink of dto.socialLinks) {
                if(!socialLink.provider || !socialLink.data) continue;
                const socialLinkEntity = await this.socialLinkService.findOne({
                    where: {
                        merchantId: id,
                        provider: socialLink.provider,
                    }
                });
                socialLinkEntity.data = socialLink?.data;
                socialLinkEntity.provider = socialLink?.provider;
                socialLinkEntity.merchantId = id;
                if (socialLinkEntity) {
                    socialLinks.push(await this.socialLinkService.update(socialLinkEntity.id, socialLinkEntity));
                } else {
                    socialLinks.push(await this.socialLinkService.create({
                        data: socialLink?.data,
                        provider: socialLink?.provider,
                        merchantId: id,
                    }));
                }
            }
            merchant.socialLinks = socialLinks;
        }
        if (dto.id) merchant.id = dto.id;
        if (dto.name) merchant.name = dto.name;
        if (dto.address) merchant.address = dto.address;
        if (dto.description) merchant.description = dto.description;
        if (dto.slogan) merchant.slogan = dto.slogan;
        if (dto.numberOfLikes) merchant.numberOfLikes = dto.numberOfLikes;
        if (dto.numberOfProducts) merchant.numberOfProducts = dto.numberOfProducts;
        if (dto.email) merchant.email = dto.email;
        if (dto.phone) merchant.phone = dto.phone;
        if (dto.usingTemplateProfileCardId) merchant.usingTemplateProfileCardId = dto.usingTemplateProfileCardId;

        return await this.merchantRepository
            .save(merchant)
    }

    async addTemplate(merchantId: string, templateId: number): Promise<any> {
        const merchant: Merchant = await this.findOne({
            where: {id: merchantId},
            relations: ['templates']
        });
        if (!merchant) throw new BadRequestException('Merchant not found');
        const template = await this.templateService.findOne({where: {id: templateId}});
        if (!template) throw new BadRequestException('Template not found');
        merchant.templates = merchant.templates || [];
        merchant.templates.push(template);
        return await this.merchantRepository.save(merchant);
    }

    async removeTemplate(merchantId: string, templateId: number): Promise<any> {
        const merchant: Merchant = await this.findOne({
            where: {id: merchantId},
            relations: ['templates']
        });
        if (!merchant) throw new BadRequestException('Merchant not found');
        const template = await this.templateService.findOne({where: {id: templateId}});
        if (!template) throw new BadRequestException('Template not found');
        merchant.templates = merchant.templates || [];
        merchant.templates = merchant.templates.filter(t => t.id !== templateId);
        return await this.merchantRepository.save(merchant);
    }

}
