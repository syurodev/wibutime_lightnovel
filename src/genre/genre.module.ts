import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { GenreDao } from './genre.dao';
import { Genre } from './entity/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService, GenreDao],
  exports: [GenreDao],
})
export class GenreModule {}
