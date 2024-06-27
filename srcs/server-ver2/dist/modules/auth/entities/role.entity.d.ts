import { Permission } from "./permission.entity";
export declare class Role {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    permissions: Permission[];
}
