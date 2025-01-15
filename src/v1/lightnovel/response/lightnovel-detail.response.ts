import { AuthorOrArtist } from '../model/lightnovel-detail.model';
import { EditorContent } from '../../../common/interfaces/editor';
import { AuthorResponse } from '../../author/response/response';
import { ArtistResponse } from '../../artist/response/response';
import { GenreResponse } from '../../genre/response/response';
import { VolumeSummaryResponse } from '../../volume/response/volume-summary.response';

type RawData = {
    id: number;
    title: string;
    cover_image_url: string;
    summary: EditorContent[];
    alternative_names: string[];
    status: number;
    type: number;
    author_id: number | null;
    author_name: string | null;
    artist_id: number | null;
    artist_name: string | null;
    genre_ids: number[];
    genre_names: string[];
    volumes: {
        id: number;
        title: string;
        release_date: string | null;
        volume_number: number;
        cover_image_url: string;
    }[];
    word_count: string;
};

export class BaseLightNovelResponse {
    id: number;
    title: string;
    cover_image_url: string;
    summary: EditorContent[];
    author: AuthorOrArtist;
    artist: AuthorOrArtist;
    status: number;
    genres: GenreResponse[];
    type: number;
    alternative_names: string[];
    word_count: number;
    volumes: VolumeSummaryResponse[];
    user: any;

    constructor(
        id: number,
        title: string,
        cover_image_url: string,
        summary: EditorContent[],
        author: AuthorOrArtist,
        artist: AuthorOrArtist,
        status: number,
        genres: GenreResponse[],
        type: number,
        alternative_names: string[],
        word_count: number,
        volumes: VolumeSummaryResponse[],
    ) {
        this.id = id;
        this.title = title;
        this.cover_image_url = cover_image_url;
        this.summary = summary;
        this.author = author;
        this.artist = artist;
        this.status = status;
        this.genres = genres;
        this.type = type;
        this.alternative_names = alternative_names;
        this.word_count = word_count;
        this.volumes = volumes;
        this.user = {
            id: 1,
            nick_name: 'Syuro',
            avatar: '',
        };
    }

    static fromRawResponse(data: RawData) {
        const author = new AuthorResponse(data.author_id, data.author_name);
        const artist = new ArtistResponse(data.artist_id, data.artist_name);
        const genres = data.genre_ids.map(
            (id: number, index: number) =>
                new GenreResponse(id, data.genre_names[index]),
        );

        return new BaseLightNovelResponse(
            data.id,
            data.title,
            data.cover_image_url,
            data.summary,
            author,
            artist,
            data.status,
            genres,
            data.type,
            data.alternative_names,
            +data.word_count,
            VolumeSummaryResponse.fromQueryBuilderGetNovelDetail(data.volumes),
        );
    }
}
