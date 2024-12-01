import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolumeChapterMap } from './entity/volume-chapter-map.entity';
import { VolumeChapterMapController } from './volume-chapter-map.controller';
import { VolumeChapterMapService } from './volume-chapter-map.service';
import { VolumeChapterMapDao } from './volume-chapter-map.dao';

@Module({
  imports: [TypeOrmModule.forFeature([VolumeChapterMap])],
  controllers: [VolumeChapterMapController],
  providers: [VolumeChapterMapService, VolumeChapterMapDao],
  exports: [VolumeChapterMapDao],
})
export class VolumeChapterMapModule {}
