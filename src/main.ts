import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { MicroserviceOptions } from '@nestjs/microservices';
import * as os from 'os';
import * as fs from 'fs';
import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { grpcServerOptions } from './grpc/server/server.config';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';

dotenv.config();

const envConfig = dotenv.parse(fs.readFileSync('.env'));
const SERVICE_NAME: string = process.env.npm_package_name;
const PREFIX = 'api';
const DEFAULT_LOGGER_LEVELS: LogLevel[] = ['log', 'error', 'warn', 'debug'];
const loggerLevels: LogLevel[] =
    process.env.CONFIG_LOGGER_LEVEL?.split(',').filter(
        (level): level is LogLevel =>
            ['log', 'error', 'warn', 'debug', 'verbose'].includes(
                level as LogLevel,
            ),
    ) || DEFAULT_LOGGER_LEVELS;

async function bootstrap() {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    process.env.uv_threadpool_size = os.cpus().length.toString();
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        {
            logger: loggerLevels,
        },
    );

    app.connectMicroservice<MicroserviceOptions>(grpcServerOptions);
    await app.startAllMicroservices();

    app.enableCors({
        origin: process.env.CORS_ALLOWED_ORIGINS?.split(',') || '*',
    });

    app.setGlobalPrefix(PREFIX);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            stopAtFirstError: true,
        }),
    );

    const document = SwaggerModule.createDocument(
        app,
        swaggerConfig(SERVICE_NAME),
    );
    SwaggerModule.setup(PREFIX, app, document);

    let moment: any = require('moment-timezone');
    await app.listen(process.env.SERVICE_PORT, '0.0.0.0');

    Logger.debug(moment().tz('Asia/Ho_Chi_Minh').format());
    Logger.debug('moment without time-zone', moment().format());

    for (const k in envConfig) {
        if (!k.includes('PASSWORD') && !k.includes('SECRET')) {
            Logger.debug(`${k}=${envConfig[k]}`);
        }
    }
}
bootstrap().then((r) => Logger.log(`${SERVICE_NAME} service started`));
