import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Volume } from '../entities/volume.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class VolumeRepository extends BaseRepository<Volume> {
    constructor(
        @InjectRepository(Volume)
        private readonly volumeRepository: Repository<Volume>,
    ) {
        super(volumeRepository);
    }
}
