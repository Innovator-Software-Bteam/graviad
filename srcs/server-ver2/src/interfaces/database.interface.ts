import {IQuery} from "./rest.interface";

/**
 * @deprecated Use IDatabaseCRUD instead
 */
export interface ICrud<E = any, C = any, U = any> {
    create?(dto?: C): Promise<E>;

    findAll?(query: IQuery): Promise<E[]>;

    findBy?(query: IQuery): Promise<E>;

    findById?(id: any, query: IQuery): Promise<E>;

    /**
     * @description Update entity by id, if not found, create new entity
     * @param id
     * @param dto
     */
    update?(id?: any, dto?: U): Promise<any>;

    /**
     * @description Update entity by id, entity must be existed. Can update only partial fields
     * @param id
     * @param dto
     */
    updatePartial?(id: any, dto?: U): Promise<any>;

    findOrCreate?(id?: any, dto?: C): Promise<E>;

    delete?(id: any): Promise<E>;

    delete?(id: any): Promise<any>;

    deleteAll?(): Promise<any>;
}

export interface IDatabaseCRUD<E = any, C = any, U = any> {
    /**
     * Create new entity
     * @param dto
     */
    create?(dto?: C): Promise<E>;

    /**
     * Find all entities
     * @param query
     */
    find?(query: IQuery): Promise<E[]>;

    /**
     * Find one entity
     * @param query
     */
    findOne?(query: IQuery): Promise<E>;

    /**
     * Update entity by id
     * @param id
     * @param dto
     */
    update?(id: string | number, dto?: U): Promise<E>;

    /**
     * Replace entity by id, require all fields
     * @param id
     * @param dto
     */
    replace?(id: string | number, dto?: C): Promise<E>;

    /**
     * Delete entity by id
     * @param id
     */
    delete?(id: string | number): Promise<E>;
}