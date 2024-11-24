import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistDao } from './artist.dao';
import { Artist, ArtistSchema } from './schema/artist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistDao],
  exports: [ArtistDao],
})
export class ArtistModule {}
