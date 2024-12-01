import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { GrpcUtil } from '@syurodev/ts-common';

import { GRPC_NAME } from 'src/common/constants/grpc-name.enum';
import {
  BasicUserResponse,
  FindOneDto,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '../protos/interfaces/user';

@Injectable()
export class UserGRPCService {
  private userServiceClient: UserServiceClient;

  constructor(
    @Inject(GRPC_NAME.GRPC_NODEJS_USER)
    private readonly clientGrpc: ClientGrpc,
  ) {
    this.userServiceClient =
      this.clientGrpc.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async getBasic(
    findOneDto: FindOneDto,
    metadata?: Metadata,
  ): Promise<BasicUserResponse> {
    try {
      return await GrpcUtil.reTry<BasicUserResponse>(
        this.userServiceClient.getBasic(findOneDto, metadata ?? new Metadata()),
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
