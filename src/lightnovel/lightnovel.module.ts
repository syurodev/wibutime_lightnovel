import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LightnovelController } from './lightnovel.controller';
import { LightnovelService } from './lightnovel.service';
import { LightnovelDao } from './lightnovel.dao';
import { Lightnovel } from './entity/lightnovel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lightnovel])],
  controllers: [LightnovelController],
  providers: [LightnovelService, LightnovelDao],
  exports: [LightnovelDao],
})
export class LightnovelModule {}
