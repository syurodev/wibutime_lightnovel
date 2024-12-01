import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistDao } from './artist.dao';
import { Artist } from './entity/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistDao],
  exports: [ArtistDao],
})
export class ArtistModule {}
