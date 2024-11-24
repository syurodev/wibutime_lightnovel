import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema({ timestamps: true, collection: 'authors' })
export class Author {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ type: String, default: '' })
  bio: string;

  @Prop({ name: 'createdAt' })
  createdAt: Date;

  @Prop({ name: 'updatedAt' })
  updatedAt: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
