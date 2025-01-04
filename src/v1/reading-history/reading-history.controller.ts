import { Controller } from '@nestjs/common';
import { ReadingHistoryService } from './reading-history.service';

@Controller('reading-histories')
export class ReadingHistoryController {
    constructor(
        private readonly readingHistoryService: ReadingHistoryService,
    ) {}
}
