import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { LightnovelModule } from './lightnovel/lightnovel.module';
import { VolumeModule } from './volume/volume.module';
import { ChapterModule } from './chapter/chapter.module';
import { AuthorModule } from './author/author.module';
import { ArtistModule } from './artist/artist.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.CONFIG_MONGODB_URI_WIBUTIME_LIGHTNOVEL),
    LightnovelModule,
    VolumeModule,
    ChapterModule,
    AuthorModule,
    ArtistModule,
    GenreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
