import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema({ collection: 'artists', timestamps: true })
export class Artist {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ type: String, default: '' })
  bio: string;

  @Prop({ name: 'createdAt'})
  createdAt: Date;

  @Prop({ name: 'updatedAt'})
  updatedAt: Date;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
