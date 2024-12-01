import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { LightnovelVolumeMap } from './entity/lightnovel-volume-map.entity';

@Injectable()
export class LightnovelVolumeMapDao {
  constructor(
    @InjectRepository(LightnovelVolumeMap)
    private readonly lightnovelVolumeMapRepository: Repository<LightnovelVolumeMap>,
  ) {}

  get repository(): Repository<LightnovelVolumeMap> {
    return this.lightnovelVolumeMapRepository;
  }

  async findAllByNovelId(novelId: number): Promise<LightnovelVolumeMap[]> {
    return await this.lightnovelVolumeMapRepository.find({
      where: { novel_id: novelId },
    });
  }

  async save(
    data: Partial<LightnovelVolumeMap>,
    entityManager?: EntityManager,
  ): Promise<LightnovelVolumeMap> {
    const manager: EntityManager =
      entityManager || this.lightnovelVolumeMapRepository.manager;

    const lightnovelVolumeMap: LightnovelVolumeMap = manager.create(
      LightnovelVolumeMap,
      data,
    );
    return await manager.save(lightnovelVolumeMap);
  }

  async saveAll(
    data: Partial<LightnovelVolumeMap[]>,
    entityManager?: EntityManager,
  ): Promise<LightnovelVolumeMap[]> {
    const manager: EntityManager =
      entityManager || this.lightnovelVolumeMapRepository.manager;

    const lightnovelVolumeMaps: LightnovelVolumeMap[] = manager.create(
      LightnovelVolumeMap,
      data,
    );
    return await manager.save(lightnovelVolumeMaps);
  }
}
