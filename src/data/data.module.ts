import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from '../config/typeorm.config';
import { Artist } from './entities/artist.entity';
import { Author } from './entities/author.entity';
import { Chapter } from './entities/chapter.entity';
import { Genre } from './entities/genre.entity';
import { Lightnovel } from './entities/lightnovel.entity';
import { LightnovelGenreMap } from './entities/lightnovel-genre-map.entity';
import { LightnovelVolumeMap } from './entities/lightnovel-volume-map.entity';
import { Volume } from './entities/volume.entity';
import { VolumeChapterMap } from './entities/volume-chapter-map.entity';
import { ArtistRepository } from './repositories/artist.repository';
import { AuthorRepository } from './repositories/author.repository';
import { ChapterRepository } from './repositories/chapter.repository';
import { GenreRepository } from './repositories/genre.repository';
import { LightnovelRepository } from './repositories/lightnovel.repository';
import { LightnovelGenreMapRepository } from './repositories/lightnovel-genre-map.repository';
import { LightnovelVolumeMapRepository } from './repositories/lightnovel-volume-map.repository';
import { VolumeRepository } from './repositories/volume.repository';
import { VolumeChapterMapRepository } from './repositories/volume-chapter-map.repository';
import { Favorite } from './entities/favorite.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        }),
        TypeOrmModule.forFeature([
            Artist,
            Author,
            Chapter,
            Genre,
            Lightnovel,
            LightnovelGenreMap,
            LightnovelVolumeMap,
            Volume,
            VolumeChapterMap,
            Favorite,
        ]),
    ],
    providers: [
        ArtistRepository,
        AuthorRepository,
        ChapterRepository,
        GenreRepository,
        LightnovelRepository,
        LightnovelGenreMapRepository,
        LightnovelVolumeMapRepository,
        VolumeRepository,
        VolumeChapterMapRepository,
    ],
    exports: [
        ArtistRepository,
        AuthorRepository,
        ChapterRepository,
        GenreRepository,
        LightnovelRepository,
        LightnovelGenreMapRepository,
        LightnovelVolumeMapRepository,
        VolumeRepository,
        VolumeChapterMapRepository,
    ],
})
export class DataModule {}
