import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { GRPC_NAME } from 'src/common/constants/grpc-name.enum';
import { COM_ZEN_GRPC_NODEJS_USER_SERVICE_PACKAGE_NAME } from './protos/interfaces/user';
import { UserGRPCService } from './service/user.service';
import { channelOptions, keepalive, loader } from '../../config/grpc.config';

@Global()
@Module({
    imports: [
        ClientsModule.register([
            {
                name: GRPC_NAME.GRPC_NODEJS_USER,
                transport: Transport.GRPC,
                options: {
                    package: [COM_ZEN_GRPC_NODEJS_USER_SERVICE_PACKAGE_NAME],
                    protoPath: [join(__dirname, './protos/user.proto')],
                    url: `${process.env.CONFIG_GRPC_NODEJS_USER_HOST}:${process.env.CONFIG_GRPC_NODEJS_USER_PORT}`,
                    loader: loader,
                    keepalive: keepalive,
                    channelOptions: channelOptions,
                },
            },
        ]),
    ],
    providers: [UserGRPCService],
    exports: [ClientsModule, UserGRPCService],
})
export class GrpcModule {}
