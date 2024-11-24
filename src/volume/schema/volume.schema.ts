import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VolumeDocument = HydratedDocument<Volume>;

@Schema({ timestamps: true, collection: 'volumes' })
export class Volume {
  @Prop({ type: 'Number', required: true, default: 0 })
  userId: number;

  @Prop({ required: true, index: true })
  title: string;

  @Prop({ name: 'lightnovelId', type: mongoose.Types.ObjectId, required: true })
  lightnovelId: mongoose.Types.ObjectId;

  @Prop({ name: 'volumeNumber', required: true })
  volumeNumber: number;

  @Prop({ name: 'coverImage', type: String, default: '' })
  coverImage: string;

  @Prop({ name: 'releaseDate' })
  releaseDate: Date;

  @Prop()
  synopsis: string;

  @Prop({ type: [mongoose.Types.ObjectId], default: [] })
  chapters: mongoose.Types.ObjectId[];

  @Prop({ name: 'createdAt', default: Date.now })
  createdAt: Date;

  @Prop({ name: 'updatedAt', default: Date.now })
  updatedAt: Date;
}

export const VolumeSchema = SchemaFactory.createForClass(Volume);
