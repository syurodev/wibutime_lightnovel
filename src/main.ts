import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { MicroserviceOptions } from '@nestjs/microservices';
import * as os from 'os';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { grpcServerOptions } from './grpc/server/server.config';

const envConfig = dotenv.parse(fs.readFileSync('.env'));

async function bootstrap() {
  process.env.TZ = 'Asia/Ho_Chi_Minh';
  process.env.uv_threadpool_size = os.cpus().length.toString();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.connectMicroservice<MicroserviceOptions>(grpcServerOptions);
  await app.startAllMicroservices();

  let moment = require('moment-timezone');
  await app.listen(process.env.SERVICE_PORT, '0.0.0.0');

  console.log(moment().tz('Asia/Ho_Chi_Minh').format());
  console.log('moment without time-zone', moment().format());

  for (const k in envConfig) {
    if (!k.includes('PASSWORD') || !k.includes('SECRET')) {
      console.log(`${k}=${envConfig[k]}`);
    }
  }
}
bootstrap();
