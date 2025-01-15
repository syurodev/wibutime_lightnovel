import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { WeeklyView } from '../entities/weekly-view.entity';

@Injectable()
export class WeeklyViewRepository extends BaseRepository<WeeklyView> {
    constructor(
        @InjectRepository(WeeklyView)
        private readonly weeklyViewRepository: Repository<WeeklyView>,
    ) {
        super(weeklyViewRepository);
    }
}
