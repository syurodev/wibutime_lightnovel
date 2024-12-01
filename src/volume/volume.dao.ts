import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Volume } from './entity/volume.entity';

@Injectable()
export class VolumeDao {
  constructor(
    @InjectRepository(Volume)
    private readonly volumeRepository: Repository<Volume>,
  ) {}

  get repository(): Repository<Volume> {
    return this.volumeRepository;
  }

  async findOne(id: number): Promise<Volume> {
    return await this.volumeRepository.findOne({
      where: { id },
    });
  }

  async save(
    data: Partial<Volume>,
    entityManager?: EntityManager,
  ): Promise<Volume> {
    const manager: EntityManager =
      entityManager || this.volumeRepository.manager;

    const volume: Volume = manager.create(Volume, data);
    return await manager.save(volume);
  }

  async saveAll(
    data: Partial<Volume[]>,
    entityManager?: EntityManager,
  ): Promise<void> {
    const manager: EntityManager =
      entityManager || this.volumeRepository.manager;

    const volumes: Volume[] = manager.create(Volume, data);
    await manager.save(volumes);
  }
}
