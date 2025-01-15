import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { BaseResponse } from '@syurodev/nestjs-common';
import { Response } from 'express';

import { ReadingHistoryService } from './reading-history.service';

@Controller('reading-histories')
export class ReadingHistoryController {
    constructor(
        private readonly readingHistoryService: ReadingHistoryService,
    ) {}

    @Get('')
    async getReadingHistories(
        @Query() query: { limit: number; page: number; user_id: number },
        @Res() res: Response,
    ) {
        const response = new BaseResponse();
        return res.status(HttpStatus.OK).send(response);
    }
}
