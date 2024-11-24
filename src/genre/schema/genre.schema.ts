import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GenreDocument = HydratedDocument<Genre>;

@Schema({ timestamps: true, collection: 'genres' })
export class Genre {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ name: 'createdAt' })
  createdAt: Date;

  @Prop({ name: 'updatedAt' })
  updatedAt: Date;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
