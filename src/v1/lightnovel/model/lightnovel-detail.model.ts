import { EditorContent } from '../../../common/interfaces/editor';
import { BasicUserDataResponse } from '../../../grpc/client/protos/interfaces/user';

export type AuthorOrArtist = {
    id: number;
    name: string;
};

export type Category = {
    id: number;
    name: string;
};

type Chapter = {
    id: number;
    title: string;
    index: number;
    updated_at: string;
    word_count: number;
};

export type Volume = {
    id: number;
    title: string;
    volume_number: number;
    synopsis: string;
    cover_image_url: string;
    release_date: string;
    chapters: Chapter[];
};

export class LightNovelModel {
    id: number;
    title: string;
    user: BasicUserDataResponse;
    cover_image_url: string;
    views: number;
    followers: number;
    summary: EditorContent[];
    author: AuthorOrArtist;
    artist: AuthorOrArtist;
    status: number;
    categories: Category[];
    type: number;
    alternative_names: string[];
    word_count: number;
    volumes: Volume[];

    constructor(data: any, user: BasicUserDataResponse) {
        this.id = data.id;
        this.title = data.title;
        this.user = user;
        this.cover_image_url = data.cover_image_url;
        this.views = data.views;
        this.followers = data.followers;
        this.summary = data.summary;
        this.author = data?.author
            ? { id: data.author.id, name: data.author.name }
            : null;
        this.artist = data?.artist
            ? { id: data.artist.id, name: data.artist.name }
            : null;
        this.status = data.status;
        this.categories = data.categories.map((c: any) => ({
            id: c.id,
            name: c.name,
        }));
        this.type = data.type;
        this.alternative_names = data.alternative_names;
        this.word_count = data.word_count;
        this.volumes = data.volumes.map((v: any) => ({
            id: v.id,
            title: v.title,
            volume_number: v.volume_number,
            synopsis: v.synopsis,
            cover_image_url: v.cover_image_url,
            release_date: v.release_date,
            chapters: v.chapters.map((ch: any) => ({
                id: ch.id,
                title: ch.title,
                index: ch.index,
                updated_at: ch.updated_at,
                word_count: ch.word_count,
            })),
        }));
    }
}
