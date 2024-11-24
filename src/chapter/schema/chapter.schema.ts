import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ChapterDocument = HydratedDocument<Chapter>;

@Schema({ timestamps: true, collection: 'chapters' })
export class Chapter {
  @Prop({ type: 'Number', required: true, default: 0 })
  userId: number;

  @Prop({ name: 'volumeId', type: mongoose.Types.ObjectId, required: true })
  volumeId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ type: Number, required: true, default: 0 })
  status: number;

  @Prop({ type: Number, required: true, default: 0 })
  index: number;

  @Prop({ type: Array, required: true, default: [] })
  content: Array<{
    id: string;
    type: string;
    url?: string;
    children: Array<{ text: string; italic?: boolean; bold?: boolean }>;
  }>;

  @Prop({ name: 'wordCount', type: Number, required: true, default: 0 })
  wordCount: number;

  @Prop({ name: 'createdAt' })
  createdAt: Date;

  @Prop({ name: 'updatedAt' })
  updatedAt: Date;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
