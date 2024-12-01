import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VolumeController } from './volume.controller';
import { VolumeService } from './volume.service';
import { VolumeDao } from './volume.dao';
import { Volume } from './entity/volume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Volume])],
  controllers: [VolumeController],
  providers: [VolumeService, VolumeDao],
  exports: [VolumeDao],
})
export class VolumeModule {}
