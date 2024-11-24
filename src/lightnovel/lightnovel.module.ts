import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LightnovelController } from './lightnovel.controller';
import { LightnovelService } from './lightnovel.service';
import { LightnovelDao } from './lightnovel.dao';
import { Lightnovel, LightnovelSchema } from './schema/lightnovel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lightnovel.name, schema: LightnovelSchema },
    ]),
  ],
  controllers: [LightnovelController],
  providers: [LightnovelService, LightnovelDao],
  exports: [LightnovelDao],
})
export class LightnovelModule {}
