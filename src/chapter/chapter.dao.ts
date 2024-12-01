import { Injectable } from '@nestjs/common';
import { Chapter } from './entity/chapter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ChapterDao {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
  ) {}

  get repository(): Repository<Chapter> {
    return this.chapterRepository;
  }

  async findOne(id: number): Promise<Chapter> {
    return await this.chapterRepository.findOne({
      where: { id },
    });
  }

  async save(
    data: Partial<Chapter>,
    entityManager?: EntityManager,
  ): Promise<Chapter> {
    const manager: EntityManager =
      entityManager || this.chapterRepository.manager;

    const chapter: Chapter = manager.create(Chapter, data);
    return await manager.save(chapter);
  }

  async saveAll(
    data: Partial<Chapter[]>,
    entityManager?: EntityManager,
  ): Promise<void> {
    const manager: EntityManager =
      entityManager || this.chapterRepository.manager;

    const chapters: Chapter[] = manager.create(Chapter, data);
    await manager.save(chapters);
  }
}
