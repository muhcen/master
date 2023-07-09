import { DeleteResult, FindOneOptions, FindOptions } from 'typeorm';

export interface BaseInterfaceRepository<T> {
    save(data: T | any): Promise<T>;
    findOne(query: any): Promise<T>;
    findByCondition(filterCondition: any): Promise<T>;
    findAll(): Promise<T[]>;
    remove(id: any): Promise<DeleteResult>;
    findWithRelations(relations: any): Promise<T[]>;
}
