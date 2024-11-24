import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterDao } from './chapter.dao';
import { Chapter, ChapterSchema } from './schema/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
  ],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterDao],
  exports: [ChapterDao],
})
export class ChapterModule {}
