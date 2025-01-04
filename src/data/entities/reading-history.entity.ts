import { TypeOrmBaseEntity } from '@syurodev/nestjs-common';
import { Column, Entity } from 'typeorm';

@Entity('reading_histories')
export class ReadingHistory extends TypeOrmBaseEntity {
    @Column({ name: 'user_id', type: 'int', nullable: false })
    user_id: number;

    @Column({ name: 'novel_id', type: 'bigint', nullable: false })
    novel_id: number;

    @Column({ name: 'chapter_id', type: 'bigint', nullable: false })
    chapter_id: number;

    @Column({
        name: 'last_read_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    last_read_at: Date; // Thời gian đọc gần nhất
}
