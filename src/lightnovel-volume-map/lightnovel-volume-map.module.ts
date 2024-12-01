import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightnovelVolumeMap } from './entity/lightnovel-volume-map.entity';
import { LightnovelVolumeMapController } from './lightnovel-volume-map.controller';
import { LightnovelVolumeMapService } from './lightnovel-volume-map.service';
import { LightnovelVolumeMapDao } from './lightnovel-volume-map.dao';

@Module({
  imports: [TypeOrmModule.forFeature([LightnovelVolumeMap])],
  controllers: [LightnovelVolumeMapController],
  providers: [LightnovelVolumeMapService, LightnovelVolumeMapDao],
  exports: [LightnovelVolumeMapDao],
})
export class LightnovelVolumeMapModule {}
