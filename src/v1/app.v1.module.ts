import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';

import { LightnovelModule } from './lightnovel/lightnovel.module';
import { VolumeModule } from './volume/volume.module';
import { ChapterModule } from './chapter/chapter.module';
import { AuthorModule } from './author/author.module';
import { ArtistModule } from './artist/artist.module';
import { GenreModule } from './genre/genre.module';
import { VolumeChapterMapModule } from './volume-chapter-map/volume-chapter-map.module';
import { LightnovelVolumeMapModule } from './lightnovel-volume-map/lightnovel-volume-map.module';
import { LightnovelGenreMapModule } from './lightnovel-genre-map/lightnovel-genre-map.module';
import { VERSION_CONTROLLER_ENUM } from '../common/constants/version-controller.enum';
import { ReadingHistoryModule } from './reading-history/reading-history.module';
import { BookmarkModule } from './bookmark/bookmark.module';

const routes: Routes = [
    {
        path: VERSION_CONTROLLER_ENUM.V1,

        children: [
            LightnovelModule,
            VolumeModule,
            ChapterModule,
            AuthorModule,
            ArtistModule,
            GenreModule,
            VolumeChapterMapModule,
            LightnovelVolumeMapModule,
            LightnovelGenreMapModule,
            ReadingHistoryModule,
            BookmarkModule,
        ],
    },
];

@Module({
    imports: [
        RouterModule.register(routes),
        LightnovelModule,
        VolumeModule,
        ChapterModule,
        AuthorModule,
        ArtistModule,
        GenreModule,
        VolumeChapterMapModule,
        LightnovelVolumeMapModule,
        LightnovelGenreMapModule,
        ReadingHistoryModule,
        BookmarkModule,
    ],
    controllers: [],
    providers: [],
})
export class AppV1Module {}
