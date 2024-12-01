import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Author } from './entity/author.entity';

@Injectable()
export class AuthorDao {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  get repository(): Repository<Author> {
    return this.authorRepository;
  }

  async findOne(id: number): Promise<Author> {
    return await this.authorRepository.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<Author> {
    return await this.authorRepository.findOne({
      where: { name },
    });
  }

  async save(
    data: Partial<Author>,
    entityManager?: EntityManager,
  ): Promise<Author> {
    const manager: EntityManager =
      entityManager || this.authorRepository.manager;

    const author: Author = manager.create(Author, data);
    return await manager.save(author);
  }
}
