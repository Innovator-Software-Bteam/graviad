export interface ICrud<E = any, C = any, U = any> {
    create?(dto?: C): Promise<E>;

    findAll?(option?: any): Promise<E[]>;

    findBy?(option?: any): Promise<E>;

    findById?(id: any): Promise<E>;

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