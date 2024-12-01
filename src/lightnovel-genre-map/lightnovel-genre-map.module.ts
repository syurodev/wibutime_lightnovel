import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LightnovelGenreMap } from './entity/lightnovel-genre-map.entity';
import { LightnovelGenreMapController } from './lightnovel-genre-map.controller';
import { LightnovelGenreMapService } from './lightnovel-genre-map.service';
import { LightnovelGenreMapDao } from './lightnovel-genre-map.dao';

@Module({
  imports: [TypeOrmModule.forFeature([LightnovelGenreMap])],
  controllers: [LightnovelGenreMapController],
  providers: [LightnovelGenreMapService, LightnovelGenreMapDao],
  exports: [LightnovelGenreMapDao],
})
export class LightnovelGenreMapModule {}
