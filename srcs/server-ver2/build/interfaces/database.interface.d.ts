import { IQuery } from "./rest.interface";
export interface ICrud<E = any, C = any, U = any> {
    create?(dto?: C): Promise<E>;
    findAll?(query: IQuery): Promise<E[]>;
    findBy?(query: IQuery): Promise<E>;
    findById?(id: any, query: IQuery): Promise<E>;
    update?(id?: any, dto?: U): Promise<any>;
    updatePartial?(id: any, dto?: U): Promise<any>;
    findOrCreate?(id?: any, dto?: C): Promise<E>;
    delete?(id: any): Promise<E>;
    delete?(id: any): Promise<any>;
    deleteAll?(): Promise<any>;
}
export interface IDatabaseCRUD<E = any, C = any, U = any> {
    create?(dto?: C): Promise<E>;
    find?(query: IQuery): Promise<E[]>;
    findOne?(query: IQuery): Promise<E>;
    update?(id: string | number, dto?: U): Promise<E>;
    replace?(id: string | number, dto?: C): Promise<E>;
    delete?(id: string | number): Promise<E>;
}
