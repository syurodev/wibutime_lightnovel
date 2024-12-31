import { Volume } from '../../../data/entities/volume.entity';
import { TimeUtil } from '@syurodev/ts-common';

export class VolumeSummaryResponse {
    id: number;
    title: string;
    cover_image_url: string;
    volume_number: number;
    release_date: string;

    constructor(init?: Partial<Volume>) {
        this.id = init?.id ?? 0;
        this.title = init?.title ?? '';
        this.cover_image_url = init?.cover_image ?? '';
        this.volume_number = init?.volume_number ?? 0;
        this.release_date = init?.release_date
            ? new TimeUtil(init?.release_date).convertToClientDateTime()
            : '';
    }

    static fromQueryBuilderGetNovelDetail(data: any): VolumeSummaryResponse[] {
        return data.map(
            (item: any) =>
                new VolumeSummaryResponse({
                    id: item.id,
                    title: item.title,
                    cover_image: item.cover_image_url,
                    volume_number: item.volume_number,
                    release_date: item.release_date,
                }),
        );
    }
}
