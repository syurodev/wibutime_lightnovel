import { Injectable } from '@nestjs/common';
import { ReadingHistoryRepository } from '../../data/repositories/reading_history.repository';

@Injectable()
export class ReadingHistoryService {
    constructor(
        private readonly readingHistoryRepository: ReadingHistoryRepository,
    ) {}
}
