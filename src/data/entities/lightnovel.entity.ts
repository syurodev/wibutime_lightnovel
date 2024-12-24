import { Entity, Column } from 'typeorm';
import { TypeOrmBaseEntity } from '@syurodev/nestjs-common';

@Entity('lightnovels')
export class Lightnovel extends TypeOrmBaseEntity {
  @Column({ name: 'user_id', type: 'int' })
  user_id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ name: 'author_id', type: 'int', default: 0 })
  author: number;

  @Column({ name: 'artist_id', type: 'int', default: 0 })
  artist: number;

  @Column({ type: 'smallint', default: 0 })
  status: number;

  @Column({ name: 'resource_id' })
  resource_id: string;

  @Column({ type: 'smallint', default: 0 })
  type: number;

  @Column('text', { array: true, name: 'alternative_names', default: [] })
  alternative_names: string[];

  @Column('jsonb', { default: [] })
  summary: Array<{
    id: string;
    type: string;
    children: Array<{ text: string; italic?: boolean; bold?: boolean }>;
  }>;

  @Column({ name: 'cover_image_url', default: '' })
  cover_image_url: string;
}
