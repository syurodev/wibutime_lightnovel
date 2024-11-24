import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LightnovelDocument = HydratedDocument<Lightnovel>;

@Schema({ timestamps: true, autoSearchIndex: true, collection: 'lightnovels' })
export class Lightnovel {
  @Prop({ type: 'Number', required: true, default: 0 })
  userId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Genre', required: true })
  genres: mongoose.Types.ObjectId[];

  @Prop({ type: mongoose.Types.ObjectId, required: true, default: '' })
  author: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, required: false, default: null })
  artist: mongoose.Types.ObjectId;

  @Prop({ type: Number, required: true, default: 0 })
  status: number;

  @Prop({ type: String, required: true, default: '' })
  resourceId: string;

  @Prop({ type: Number, required: true, default: 0 })
  type: number;

  @Prop({
    name: 'alternativeNames',
    type: [String],
    required: true,
    default: [],
  })
  alternativeNames: string[];

  @Prop({ type: [mongoose.Types.ObjectId], required: true, default: [] })
  volumes: mongoose.Types.ObjectId[];

  @Prop({ type: Array, required: true, default: [] })
  summary: Array<{
    id: string;
    type: string;
    children: Array<{ text: string; italic?: boolean; bold?: boolean }>;
  }>;

  @Prop({ name: 'coverImageUrl', required: true, default: '' })
  coverImageUrl: string;

  @Prop({ name: 'createdAt' })
  createdAt: Date;

  @Prop({ name: 'updatedAt' })
  updatedAt: Date;
}

export const LightnovelSchema = SchemaFactory.createForClass(Lightnovel);
