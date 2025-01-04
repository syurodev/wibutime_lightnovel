import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from '@syurodev/nestjs-common';
import { VolumeService } from './volume.service';
import { VolumeDetailResponse } from './response/volume-detail.response';

@Controller('volumes')
export class VolumeController {
    constructor(private readonly volumeService: VolumeService) {}
    @Get('/:id/detail')
    async getDetail(@Param('id') id: number, @Res() res: Response) {
        const response: BaseResponse<any> = new BaseResponse<any>();

        const result = await this.volumeService.getDetail(id);

        response.setData(new VolumeDetailResponse(result));
        return res.status(HttpStatus.OK).send(response);
    }
}
