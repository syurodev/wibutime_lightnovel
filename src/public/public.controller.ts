import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { BaseResponse } from '@syurodev/nestjs-common';
import { Response } from 'express';

@Controller('public')
export class PublicController {
    @Get('health-check')
    async healthCheck(@Res() res: Response) {
        const response: BaseResponse<any> = new BaseResponse<any>();
        response.setData({
            build_number: process.env.CONFIG_BUILD_NUMBER || '',
            build_time: process.env.CONFIG_BUILD_TIME || '',
        });

        return res.status(HttpStatus.OK).send(response);
    }
}
