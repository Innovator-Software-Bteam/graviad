import { IDatabaseCRUD, IQuery } from "@app/interfaces";
import { CreateAvatarDTO, CreateSocialLinkDto, CreateMerchantDto, UpdateAvatarDTO, UpdateMerchantDto, UpdateSocialLinkDto } from "./dto";
import { Avatar, Merchant, SocialLink } from "./entities";
import { Repository } from "typeorm";
import { IMerchantAction } from "@app/modules/merchant/merchant.interface";
import { TemplateService } from "@app/modules/template/template.service";
import { UserService } from "@app/modules/user";
export declare class SocialLinkService implements IDatabaseCRUD<SocialLink, CreateSocialLinkDto, UpdateSocialLinkDto> {
    private readonly socialLinkRepository;
    constructor(socialLinkRepository: Repository<SocialLink>);
    create(dto: CreateSocialLinkDto): Promise<SocialLink>;
    delete(id: any): Promise<any>;
    findOne(query: IQuery): Promise<SocialLink>;
    update(id?: any, dto?: UpdateSocialLinkDto): Promise<any>;
    find(query: IQuery): Promise<SocialLink[]>;
    replace(id: number, dto?: CreateSocialLinkDto): Promise<SocialLink>;
}
export declare class AvatarService implements IDatabaseCRUD<Avatar, CreateAvatarDTO, UpdateAvatarDTO> {
    private readonly avatar2DRepository;
    constructor(avatar2DRepository: Repository<Avatar>);
    create(dto?: CreateAvatarDTO): Promise<Avatar>;
    delete(id: any): Promise<any>;
    update(id?: any, dto?: UpdateAvatarDTO): Promise<any>;
    find(query: IQuery): Promise<Avatar[]>;
    findOne(query: IQuery): Promise<Avatar>;
    replace(id: string | number, dto?: CreateAvatarDTO): Promise<Avatar>;
}
export declare class MerchantService implements IDatabaseCRUD<Merchant, CreateMerchantDto, UpdateMerchantDto>, IMerchantAction {
    private readonly merchantRepository;
    private readonly socialLinkService;
    private readonly avatar2DService;
    private readonly templateService;
    private readonly userService;
    constructor(merchantRepository: Repository<Merchant>, socialLinkService: SocialLinkService, avatar2DService: AvatarService, templateService: TemplateService, userService: UserService);
    create(dto: CreateMerchantDto): Promise<Merchant>;
    delete(id: any): Promise<any>;
    find(query: IQuery): Promise<Merchant[]>;
    findOne(query: IQuery): Promise<Merchant>;
    replace(id?: any, dto?: UpdateMerchantDto): Promise<any>;
    update(id: string, dto?: UpdateMerchantDto): Promise<any>;
    addTemplate(merchantId: string, templateId: number): Promise<any>;
    removeTemplate(merchantId: string, templateId: number): Promise<any>;
}
