export interface ICrud<T = any, D = any, U = any> {
    create?(dto?: D): Promise<T>;

    update?(id: any, dto?: U): Promise<T>;

    update?(id: any, dto?: U): Promise<any>;

    delete?(id: any): Promise<T>;

    delete?(id: any): Promise<any>;

    findAll?(option?: any): Promise<T[]>;

    findBy?(option?: any): Promise<T>;

    findById?(id: any): Promise<T>;
}