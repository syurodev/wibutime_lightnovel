import { BasicUserDataResponse } from 'src/grpc/client/protos/interfaces/user';
import {
  AuthorOrArtist,
  Category,
  LightNovelModel,
  Summary,
  Volume,
} from '../model/lightnovel-detail.model';
import { TIME_FORMAT, TimeUtil } from '@syurodev/ts-common';

export class LightNovelDetailResponse {
  id: number;
  title: string;
  user: BasicUserDataResponse;
  resource_id: string;
  cover_image_url: string;
  summary: Summary[];
  author: AuthorOrArtist;
  artist: AuthorOrArtist;
  status: number;
  categories: Category[];
  type: string;
  alternative_names: string[];
  word_count: number;
  volumes: Volume[];

  constructor(lightnovel: LightNovelModel, user: BasicUserDataResponse) {
    this.id = lightnovel.id;
    this.title = lightnovel.title;
    this.resource_id = lightnovel.resource_id;
    this.user = user;
    this.cover_image_url = lightnovel.cover_image_url;
    this.summary = lightnovel.summary.map((s: any) => ({
      id: s.id,
      type: s.type,
      children: s.children.map((c: any) => ({
        text: c?.text ?? '',
        italic: c?.italic ?? false,
        bold: c?.bold ?? false,
      })),
    }));
    this.author = lightnovel?.author
      ? { id: lightnovel.author.id, name: lightnovel.author.name }
      : null;
    this.artist = lightnovel?.artist
      ? { id: lightnovel.artist.id, name: lightnovel.artist.name }
      : null;
    this.status = lightnovel.status;
    this.categories = lightnovel.categories.map((c: any) => ({
      id: c.id,
      name: c.name,
    }));
    // this.type = lightnovel.type;
    this.type = 'Máy dịch';
    this.alternative_names = lightnovel.alternative_names;
    this.word_count = lightnovel.word_count;
    this.volumes = lightnovel.volumes.map((v: any) => ({
      id: v.id,
      title: v.title,
      volume_number: v.volume_number,
      synopsis: v.synopsis,
      cover_image_url: v.cover_image_url,
      release_date: v.release_date
        ? TimeUtil.formatTime(v.release_date, TIME_FORMAT.SHORT_DATE)
        : '',
      chapters: v.chapters.map((ch: any) => ({
        id: ch.id,
        title: ch.title,
        index: ch.index,
        updated_at: TimeUtil.formatTime(ch.updated_at, TIME_FORMAT.SHORT_DATE),
        word_count: ch.word_count,
      })),
    }));
  }
}
