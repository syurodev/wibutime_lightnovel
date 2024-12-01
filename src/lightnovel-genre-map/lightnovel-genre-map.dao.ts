import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { LightnovelGenreMap } from './entity/lightnovel-genre-map.entity';

@Injectable()
export class LightnovelGenreMapDao {
  constructor(
    @InjectRepository(LightnovelGenreMap)
    private readonly lightnovelGenreRepository: Repository<LightnovelGenreMap>,
  ) {}

  get repository(): Repository<LightnovelGenreMap> {
    return this.lightnovelGenreRepository;
  }

  async findAllByNovelId(novelId: number): Promise<LightnovelGenreMap[]> {
    return await this.lightnovelGenreRepository.find({
      where: { novel_id: novelId },
    });
  }

  async findAllByGenreId(genreId: number): Promise<LightnovelGenreMap[]> {
    return await this.lightnovelGenreRepository.find({
      where: { genre_id: genreId },
    });
  }

  async save(
    data: Partial<LightnovelGenreMap>,
    entityManager?: EntityManager,
  ): Promise<LightnovelGenreMap> {
    const manager: EntityManager =
      entityManager || this.lightnovelGenreRepository.manager;

    const lightnovelGenre: LightnovelGenreMap = manager.create(
      LightnovelGenreMap,
      data,
    );
    return await manager.save(lightnovelGenre);
  }

  async saveAll(
    data: Partial<LightnovelGenreMap[]>,
    entityManager?: EntityManager,
  ): Promise<LightnovelGenreMap[]> {
    const manager: EntityManager =
      entityManager || this.lightnovelGenreRepository.manager;

    const lightnovelGenres: LightnovelGenreMap[] = manager.create(
      LightnovelGenreMap,
      data,
    );
    return await manager.save(lightnovelGenres);
  }
}
