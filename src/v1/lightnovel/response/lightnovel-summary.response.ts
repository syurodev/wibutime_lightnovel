import { AuthorResponse } from '../../author/response/response';
import { ArtistResponse } from '../../artist/response/response';
import { GenreResponse } from '../../genre/response/response';

export class LightnovelSummaryResponse {
    id: number;
    title: string;
    cover_image_url: string;
    views: number;
    author: AuthorResponse;
    artist: ArtistResponse;
    genres: GenreResponse[];

    constructor(
        id: number,
        title: string,
        cover_image_url: string,
        views: number,
        author: AuthorResponse,
        artist: ArtistResponse,
        genres: GenreResponse[],
    ) {
        this.id = id;
        this.title = title;
        this.cover_image_url = cover_image_url;
        this.views = views ?? 0;
        this.author = author;
        this.artist = artist;
        this.genres = genres;
    }

    static fromRawResponse(
        response: any,
    ): LightnovelSummaryResponse | LightnovelSummaryResponse[] {
        if (Array.isArray(response)) {
            return response.map((x) => {
                const author = new AuthorResponse(x.author_id, x.author_name);
                const artist = new ArtistResponse(x.artist_id, x.artist_name);
                const genres = x.genre_ids.map(
                    (id: number, index: number) =>
                        new GenreResponse(id, x.genre_names[index]),
                );

                return new LightnovelSummaryResponse(
                    x.id,
                    x.title,
                    x.cover_image_url,
                    Number(x?.views) ?? 0,
                    author,
                    artist,
                    genres,
                );
            });
        } else {
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
                Number(response?.views) ?? 0,
                author,
                artist,
                genres,
            );
        }
    }
}
