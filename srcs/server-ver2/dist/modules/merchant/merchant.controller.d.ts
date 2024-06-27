import { MerchantService, SocialLinkService } from "./merchant.service";
import { IMerchantQuery } from "./merchant.interface";
import { UpdateMerchantDto } from "./dto";
import { Response } from "express";
export declare class MerchantController {
    private readonly merchantService;
    private readonly socialLinkService;
    constructor(merchantService: MerchantService, socialLinkService: SocialLinkService);
    list(query: IMerchantQuery): Promise<import("./entities").Merchant[]>;
    findBy(id: string, query: IMerchantQuery): Promise<import("./entities").Merchant>;
    getAvatar(id: string, res: Response): Promise<void>;
    getRelation(id: string, relation: string): Promise<any>;
    create(body: any): Promise<import("./entities").Merchant>;
    addTemplate(id: string, templateId: number): Promise<any>;
    removeTemplate(id: string, templateId: number): Promise<any>;
    replace(id: string, body: UpdateMerchantDto): Promise<any>;
    update(id: string, body: UpdateMerchantDto): Promise<any>;
    remove(email: string): Promise<any>;
}
