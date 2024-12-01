import {
  Controller,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BaseResponse, GrpcExceptionFilter } from '@syurodev/nestjs-common';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

import { GetDetailDTO } from './dto/get-detail.dto';
import { LightNovelDetailResponse } from './response/lightnovel-detail.response';
import { LightnovelService } from './lightnovel.service';

@Controller('lightnovels')
@UseFilters(new GrpcExceptionFilter())
export class LightnovelController {
  constructor(private readonly lightnovelService: LightnovelService) {}

  @GrpcMethod('LightnovelService', 'getFullInfoLightNovel')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors) =>
        new HttpException(errors, HttpStatus.BAD_REQUEST),
    }),
  )
  async getBasic(
    request: GetDetailDTO,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    const response: BaseResponse<LightNovelDetailResponse> =
      new BaseResponse<LightNovelDetailResponse>();

    console.log(await this.lightnovelService.getDetail(request.id));

    response.setData(await this.lightnovelService.getDetail(request.id));
    return response;
  }
}
