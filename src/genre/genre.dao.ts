import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Genre } from './entity/genre.entity';

@Injectable()
export class GenreDao {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  get repository(): Repository<Genre> {
    return this.genreRepository;
  }

  async findOne(id: number): Promise<Genre> {
    return await this.genreRepository.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<Genre> {
    return await this.genreRepository.findOne({
      where: { name },
    });
  }

  async save(
    data: Partial<Genre>,
    entityManager?: EntityManager,
  ): Promise<Genre> {
    const manager: EntityManager =
      entityManager || this.genreRepository.manager;

    const genre: Genre = manager.create(Genre, data);
    return await manager.save(genre);
  }
}
