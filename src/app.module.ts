import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LightnovelModule } from './lightnovel/lightnovel.module';
import { VolumeModule } from './volume/volume.module';
import { ChapterModule } from './chapter/chapter.module';
import { AuthorModule } from './author/author.module';
import { ArtistModule } from './artist/artist.module';
import { GenreModule } from './genre/genre.module';
import { VolumeChapterMapModule } from './volume-chapter-map/volume-chapter-map.module';
import { LightnovelVolumeMapModule } from './lightnovel-volume-map/lightnovel-volume-map.module';
import { LightnovelGenreMapModule } from './lightnovel-genre-map/lightnovel-genre-map.module';
import { GrpcModule } from './grpc/client/grpc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '103.75.180.127',
      port: 5433,
      username: 'admin',
      password: 'U1AWq5jguFa9el1EvsFL1JphviEOSG5bVyPC38XcU',
      database: 'wibutime_lightnovel',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    GrpcModule,
    LightnovelModule,
    VolumeModule,
    ChapterModule,
    AuthorModule,
    ArtistModule,
    GenreModule,
    VolumeChapterMapModule,
    LightnovelVolumeMapModule,
    LightnovelGenreMapModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
