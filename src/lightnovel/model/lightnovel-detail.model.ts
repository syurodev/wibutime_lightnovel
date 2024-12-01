type SummaryChild = {
  text: string;
  italic: boolean;
  bold: boolean;
};

export type Summary = {
  id: string;
  type: string;
  children: SummaryChild[];
};

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
  user_id: number;
  resource_id: string;
  cover_image_url: string;
  summary: Summary[];
  author: AuthorOrArtist;
  artist: AuthorOrArtist;
  status: number;
  categories: Category[];
  type: number;
  alternative_names: string[];
  word_count: number;
  volumes: Volume[];

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.resource_id = data.resource_id;
    this.cover_image_url = data.cover_image_url;
    this.summary = data.summary.map((s: any) => ({
      id: s.id,
      type: s.type,
      children: s.children.map((c: any) => ({
        text: c?.text ?? '',
        italic: c?.italic ?? false,
        bold: c?.bold ?? false,
      })),
    }));
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
