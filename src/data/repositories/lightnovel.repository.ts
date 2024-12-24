import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lightnovel } from '../entities/lightnovel.entity';
import { PGFunctionResult } from '@syurodev/nestjs-common';
import { LightNovelModel } from '../../v1/lightnovel/model/lightnovel-detail.model';
import { BaseRepository } from './base.repository';

@Injectable()
export class LightnovelRepository extends BaseRepository<Lightnovel> {
    constructor(
        @InjectRepository(Lightnovel)
        private readonly lightnovelRepository: Repository<Lightnovel>,
    ) {
        super(lightnovelRepository);
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
}
