import {
    DeleteResult,
    Repository,
    FindOptionsWhere,
    FindOneOptions,
    FindOptions,
} from 'typeorm';
import { BaseInterfaceRepository } from './base.interface.repository';
import { User } from 'src/app/users/entities/user.entity';

export abstract class BaseAbstractRepository<T>
    implements BaseInterfaceRepository<T>
{
    constructor(private readonly repository: Repository<T>) {}

    async save(data: T | any): Promise<T> {
        return this.repository.save(data);
    }

    async findOne(query: any): Promise<T> {
        return this.repository.findOne(query);
    }

    async findByCondition(filterCondition: any): Promise<T> {
        return this.repository.findOne(filterCondition);
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async remove(query): Promise<DeleteResult> {
        return this.repository.delete(query);
    }

    async findWithRelations(relations: any): Promise<T[]> {
        return this.repository.find({ relations });
    }
}
