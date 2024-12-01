import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { LightnovelDao } from './lightnovel.dao';
import { LightNovelModel } from './model/lightnovel-detail.model';
import { UserGRPCService } from 'src/grpc/client/service/user.service';
import { BasicUserResponse } from 'src/grpc/client/protos/interfaces/user';
import { LightNovelDetailResponse } from './response/lightnovel-detail.response';

@Injectable()
export class LightnovelService {
  constructor(
    private readonly lightnovelDao: LightnovelDao,
    private readonly userGRPCService: UserGRPCService,
  ) {}

  async getDetail(id: number): Promise<LightNovelDetailResponse> {
    try {
      const lightNovelModel: LightNovelModel =
        await this.lightnovelDao.getDetail(id);

      const userBasic: BasicUserResponse = await this.userGRPCService.getBasic({
        id: lightNovelModel.user_id,
      });

      if (userBasic.status !== HttpStatus.OK) {
        throw new HttpException(userBasic.message, HttpStatus.BAD_REQUEST);
      }

      return new LightNovelDetailResponse(lightNovelModel, userBasic.data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
