import {
    DeepPartial,
    EntityManager,
    FindOptionsWhere,
    Repository,
} from 'typeorm';

export class BaseRepository<T> {
    constructor(private readonly repository: Repository<T>) {}

    manager(): EntityManager {
        return this.repository.manager;
    }

    async findOne(option: FindOptionsWhere<T>): Promise<T> {
        return await this.repository.findOne({
            where: option,
        });
    }

    async findAndCount(
        option: FindOptionsWhere<T>,
        page: number,
        limit: number,
    ): Promise<[T[], number]> {
        return await this.repository.findAndCount({
            where: option,
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async delete(
        option: FindOptionsWhere<T>,
        entityManager?: EntityManager,
    ): Promise<void> {
        const manager: EntityManager = entityManager || this.repository.manager;

        await manager.getRepository<T>(this.repository.target).delete(option);
    }

    async save(
        data: DeepPartial<T>,
        entityManager?: EntityManager,
    ): Promise<T> {
        const manager: EntityManager = entityManager || this.repository.manager;

        // Create the record using the repository
        const record = this.repository.create(data);
        return await manager.save(record);
    }
}
