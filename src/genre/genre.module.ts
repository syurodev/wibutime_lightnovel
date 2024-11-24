import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { GenreDao } from './genre.dao';
import { Genre, GenreSchema } from './schema/genre.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  controllers: [GenreController],
  providers: [GenreService, GenreDao],
  exports: [GenreDao],
})
export class GenreModule {}
