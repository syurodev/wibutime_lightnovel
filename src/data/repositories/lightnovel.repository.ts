import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lightnovel } from '@entities/lightnovel.entity';
import { StoreProcedureUtil } from '@utils/stored-procedure.util';
import { BaseRepository } from './base.repository';

@Injectable()
export class LightnovelRepository extends BaseRepository<Lightnovel> {
  constructor(
    @InjectRepository(Lightnovel)
    private readonly lightnovelRepository: Repository<Lightnovel>,
  ) {
    super(lightnovelRepository);
  }

  async getSummary(id: number) {
    return await this.lightnovelRepository
      .createQueryBuilder('ln')
      .leftJoin('authors', 'author', 'author.id = ln.author')
      .leftJoin('artists', 'artist', 'artist.id = ln.artist')
      .leftJoin('lightnovel_genre_maps', 'map', 'map.novel_id = ln.id')
      .leftJoin('genres', 'genre', 'genre.id = map.genre_id')
      .where('ln.id = :id', { id })
      .select([
        'ln.id AS id',
        'ln.title AS title',
        'ln.cover_image_url AS cover_image_url',
        'author.id AS author_id',
        'author.name AS author_name',
        'artist.id AS artist_id',
        'artist.name AS artist_name',
        'array_agg(genre.id) AS genre_ids',
        'array_agg(genre.name) AS genre_names',
      ])
      .groupBy('ln.id, author.id, artist.id')
      .getRawOne();
  }

  async getDetail(id: number) {
    return await this.lightnovelRepository
      .createQueryBuilder('ln')
      // Join với bảng tác giả
      .leftJoin('authors', 'author', 'author.id = ln.author')
      // Join với bảng họa sĩ
      .leftJoin('artists', 'artist', 'artist.id = ln.artist')
      // Join với bảng liên kết thể loại
      .leftJoin('lightnovel_genre_maps', 'map', 'map.novel_id = ln.id')
      // Join với bảng thể loại
      .leftJoin('genres', 'genre', 'genre.id = map.genre_id')
      // Join với bảng liên kết volume
      .leftJoin(
        'lightnovel_volume_maps',
        'volume_map',
        'volume_map.novel_id = ln.id',
      )
      // Join với bảng volume
      .leftJoin('volumes', 'volume', 'volume.id = volume_map.volume_id')
      // Join với bảng liên kết chapter
      .leftJoin(
        'volume_chapter_maps',
        'chapter_map',
        'chapter_map.volume_id = volume.id',
      )
      // Join với bảng chapter
      .leftJoin('chapters', 'chapter', 'chapter.id = chapter_map.chapter_id')
      .where('ln.id = :id', { id })
      .select([
        'ln.id AS id',
        'ln.title AS title',
        'ln.cover_image_url AS cover_image_url',
        'ln.summary AS summary',
        'ln.alternative_names AS alternative_names',
        'ln.status AS status',
        'ln.type AS type',
        'author.id AS author_id',
        'author.name AS author_name',
        'artist.id AS artist_id',
        'artist.name AS artist_name',
        'array_agg(DISTINCT genre.id) AS genre_ids',
        'array_agg(DISTINCT genre.name) AS genre_names',
        'json_agg(DISTINCT jsonb_build_object(' +
          "'id', volume.id, " +
          "'title', volume.title, " +
          "'volume_number', volume.volume_number, " +
          "'cover_image_url', volume.cover_image, " +
          "'release_date', volume.release_date" +
          ')) AS volumes',
        'COALESCE(SUM(chapter.word_count), 0) AS word_count',
      ])
      .groupBy('ln.id, author.id, artist.id')
      .getRawOne();
  }

  async getSummaryWithPagination({
    user_id,
    author_id,
    artist_id,
    status,
    type,
    key_search,
    page,
    limit,
  }: {
    user_id: number;
    author_id: number;
    artist_id: number;
    status: number;
    type: number;
    key_search: string;
    page: number;
    limit: number;
  }) {
    const result = new StoreProcedureUtil(
      await this.lightnovelRepository.query(
        `CALL get_summary_novels_with_pagination($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          user_id,
          author_id,
          artist_id,
          status,
          type,
          key_search ?? '',
          page,
          limit,
          null,
          null,
          0,
          '',
        ],
      ),
    );

    return {
      items: result.getResult(),
      total: result.getTotalRecord(),
      page,
      limit,
      totalPages: Math.ceil(result.getTotalRecord() / limit),
    };
  }

  async getTop(type: number, limit: number) {
    return new StoreProcedureUtil(
      await this.lightnovelRepository.query(
        `CALL get_top_novels($1, $2, $3, $4, $5)`,
        [type, limit, null, 0, ''],
      ),
    ).getResult();
  }
}
