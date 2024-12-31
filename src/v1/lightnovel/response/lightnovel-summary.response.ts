import { AuthorResponse } from '../../author/response/response';
import { ArtistResponse } from '../../artist/response/response';
import { GenreResponse } from '../../genre/response/response';

export class LightnovelSummaryResponse {
    id: number;
    title: string;
    cover_image_url: string;
    author: AuthorResponse;
    artist: ArtistResponse;
    genres: GenreResponse[];

    constructor(
        id: number,
        title: string,
        cover_image_url: string,
        author: AuthorResponse,
        artist: ArtistResponse,
        genres: GenreResponse[],
    ) {
        this.id = id;
        this.title = title;
        this.cover_image_url = cover_image_url;
        this.author = author;
        this.artist = artist;
        this.genres = genres;
    }

    static fromRawResponse(response: any): LightnovelSummaryResponse {
        const author = new AuthorResponse(
            response.author_id,
            response.author_name,
        );
        const artist = new ArtistResponse(
            response.artist_id,
            response.artist_name,
        );
        const genres = response.genre_ids.map(
            (id: number, index: number) =>
                new GenreResponse(id, response.genre_names[index]),
        );

        return new LightnovelSummaryResponse(
            response.id,
            response.title,
            response.cover_image_url,
            author,
            artist,
            genres,
        );
    }
}
