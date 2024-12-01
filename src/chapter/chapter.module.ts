import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';
import { ChapterDao } from './chapter.dao';
import { Chapter } from './entity/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter])],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterDao],
  exports: [ChapterDao],
})
export class ChapterModule {}
