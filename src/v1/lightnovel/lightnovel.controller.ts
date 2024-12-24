import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { BaseResponse, GrpcExceptionFilter } from '@syurodev/nestjs-common';
import { LightNovelDetailResponse } from './response/lightnovel-detail.response';
import { LightnovelService } from './lightnovel.service';

@Controller('novels')
@UseFilters(new GrpcExceptionFilter())
export class LightnovelController {
    constructor(private readonly lightnovelService: LightnovelService) {}

    @Get('/:id')
    async getBasic(@Param('id') id: number) {
        const response: BaseResponse<LightNovelDetailResponse> =
            new BaseResponse<LightNovelDetailResponse>();

        console.log(await this.lightnovelService.getDetail(id));

        response.setData(await this.lightnovelService.getDetail(id));
        return response;
    }
}
