import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GrpcModule } from './grpc/client/grpc.module';
import { DataModule } from './data/data.module';
import { AppV1Module } from './v1/app.v1.module';
import { RedisClientModule } from './redis/redis.module';
import { ThrottlerModule } from '@nestjs/throttler';

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
        RedisClientModule,
        AppV1Module,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
