import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisClientModule } from '@syurodev/nestjs-common';

import { GrpcModule } from './grpc/client/grpc.module';
import { DataModule } from './data/data.module';
import { AppV1Module } from './v1/app.v1.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        ThrottlerModule.forRoot([
            {
                name: 'default',
                ttl: 1000,
                limit: 5,
            },
        ]),
        GrpcModule,
        DataModule,
        // RedisClientModule,
        RedisClientModule.forRoot({
            host: process.env.CONFIG_REDIS_HOST,
            port: +process.env.CONFIG_REDIS_PORT,
            password: process.env.CONFIG_REDIS_PASSWORD,
            database: +process.env.CONFIG_REDIS_DB,
        }),
        AppV1Module,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
