import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Lightnovel } from './entity/lightnovel.entity';
import { PGFunctionResult } from '@syurodev/nestjs-common';
import { LightNovelModel } from './model/lightnovel-detail.model';

@Injectable()
export class LightnovelDao {
  constructor(
    @InjectRepository(Lightnovel)
    private readonly lightnovelRepository: Repository<Lightnovel>,
  ) {}

  get repository(): Repository<Lightnovel> {
    return this.lightnovelRepository;
  }

  async findOne(id: number): Promise<Lightnovel> {
    return await this.lightnovelRepository.findOne({
      where: { id },
    });
  }

  async getDetail(id: number): Promise<LightNovelModel> {
    const result = await this.lightnovelRepository.query(
      `
      SELECT * FROM get_lightnovel_detail($1) AS data;
    `,
      [id],
    );

    return new PGFunctionResult<LightNovelModel>(result).getResultOutput();
  }

  async save(
    data: Partial<Lightnovel>,
    entityManager?: EntityManager,
  ): Promise<Lightnovel> {
    const manager: EntityManager =
      entityManager || this.lightnovelRepository.manager;

    const lightnovel: Lightnovel = manager.create(Lightnovel, data);
    return await manager.save(lightnovel);
  }

  async saveAll(
    data: Partial<Lightnovel[]>,
    entityManager?: EntityManager,
  ): Promise<void> {
    const manager: EntityManager =
      entityManager || this.lightnovelRepository.manager;

    const lightnovels: Lightnovel[] = manager.create(Lightnovel, data);
    await manager.save(lightnovels);
  }
}
