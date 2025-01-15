import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lightnovel } from '../entities/lightnovel.entity';
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
            .leftJoin(
                'chapters',
                'chapter',
                'chapter.id = chapter_map.chapter_id',
            )
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
        const queryBuilder = this.lightnovelRepository
            .createQueryBuilder('ln')
            .leftJoin('authors', 'author', 'author.id = ln.author')
            .leftJoin('artists', 'artist', 'artist.id = ln.artist')
            .leftJoin('lightnovel_genre_maps', 'map', 'map.novel_id = ln.id')
            .leftJoin('genres', 'genre', 'genre.id = map.genre_id')
            .select([
                'ln.id AS id',
                'ln.title AS title',
                'ln.cover_image_url AS cover_image_url',
                'author.id AS author_id',
                'author.name AS author_name',
                'artist.id AS artist_id',
                'artist.name AS artist_name',
                'array_agg(DISTINCT genre.id) AS genre_ids',
                'array_agg(DISTINCT genre.name) AS genre_names',
            ])
            .groupBy('ln.id, author.id, artist.id');

        // Filter conditions
        if (user_id) {
            queryBuilder.andWhere('ln.user_id = :user_id', { user_id });
        }
        if (author_id) {
            queryBuilder.andWhere('ln.author = :author_id', { author_id });
        }
        if (artist_id) {
            queryBuilder.andWhere('ln.artist = :artist_id', { artist_id });
        }
        if (status > -1) {
            queryBuilder.andWhere('ln.status = :status', { status });
        }
        if (type > -1) {
            queryBuilder.andWhere('ln.type = :type', { type });
        }
        if (key_search) {
            queryBuilder.andWhere(
                '(ln.title ILIKE :key_search OR :key_search = ANY(ln.alternative_names))',
                { key_search: `%${key_search}%` },
            );
        }

        // Pagination
        const offset = (page - 1) * limit;
        queryBuilder.offset(offset).limit(limit);

        // Execute query
        const [items, total] = await queryBuilder.getManyAndCount();

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async getTop(type: number, limit: number) {
        let viewTable = '';

        // Xác định bảng views cần sử dụng
        switch (+type) {
            case 1:
                viewTable = 'daily_views';
                break;
            case 2:
                viewTable = 'weekly_views';
                break;
            case 3:
                viewTable = 'monthly_views';
                break;
            case 4:
                viewTable = 'yearly_views';
                break;
            case 5:
                viewTable = 'chapters'; // Dữ liệu tổng cho tất cả thời gian
                break;
            default:
                throw new Error('Invalid top_type');
        }

        const query = this.lightnovelRepository
            .createQueryBuilder('ln')
            .leftJoin(
                (subQuery) => {
                    return subQuery
                        .select('view.novel_id', 'novel_id')
                        .addSelect('SUM(view.views)', 'views')
                        .from(viewTable, 'view')
                        .groupBy('view.novel_id');
                },
                'view',
                'view.novel_id = ln.id',
            )
            .leftJoin('authors', 'author', 'author.id = ln.author')
            .leftJoin('artists', 'artist', 'artist.id = ln.artist')
            .leftJoin('lightnovel_genre_maps', 'map', 'map.novel_id = ln.id')
            .leftJoin('genres', 'genre', 'genre.id = map.genre_id')
            .select([
                'ln.id AS id',
                'ln.title AS title',
                'ln.cover_image_url AS cover_image_url',
                'author.id AS author_id',
                'author.name AS author_name',
                'artist.id AS artist_id',
                'artist.name AS artist_name',
                'array_agg(DISTINCT genre.id) AS genre_ids',
                'array_agg(DISTINCT genre.name) AS genre_names',
                'COALESCE(view.views, 0) AS views', // Đổi tên trong select
            ])
            .groupBy('ln.id, author.id, artist.id, view.views') // Group theo các trường cần thiết
            .orderBy('views', 'DESC') // Sắp xếp theo tổng lượt xem
            .limit(limit); // Giới hạn kết quả

        return await query.getRawMany();
    }
}
