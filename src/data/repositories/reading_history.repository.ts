import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ReadingHistory } from '../entities/reading-history.entity';

@Injectable()
export class ReadingHistoryRepository extends BaseRepository<ReadingHistory> {
    constructor(
        @InjectRepository(ReadingHistory)
        private readonly readingHistoryRepository: Repository<ReadingHistory>,
    ) {
        super(readingHistoryRepository);
    }
}
