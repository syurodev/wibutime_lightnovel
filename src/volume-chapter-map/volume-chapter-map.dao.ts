import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { VolumeChapterMap } from './entity/volume-chapter-map.entity';

@Injectable()
export class VolumeChapterMapDao {
  constructor(
    @InjectRepository(VolumeChapterMap)
    private readonly volumeChapterRepository: Repository<VolumeChapterMap>,
  ) {}

  get repository(): Repository<VolumeChapterMap> {
    return this.volumeChapterRepository;
  }

  async findAllByVolumeId(volumeId: number): Promise<VolumeChapterMap[]> {
    return await this.volumeChapterRepository.find({
      where: { volume_id: volumeId },
    });
  }

  async save(
    data: Partial<VolumeChapterMap>,
    entityManager?: EntityManager,
  ): Promise<VolumeChapterMap> {
    const manager: EntityManager =
      entityManager || this.volumeChapterRepository.manager;

    const volumeChapter: VolumeChapterMap = manager.create(
      VolumeChapterMap,
      data,
    );
    return await manager.save(volumeChapter);
  }

  async saveAll(
    data: Partial<VolumeChapterMap[]>,
    entityManager?: EntityManager,
  ): Promise<VolumeChapterMap[]> {
    const manager: EntityManager =
      entityManager || this.volumeChapterRepository.manager;

    const volumeChapters: VolumeChapterMap[] = manager.create(
      VolumeChapterMap,
      data,
    );
    return await manager.save(volumeChapters);
  }
}
