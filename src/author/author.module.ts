import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorDao } from './author.dao';
import { Author, AuthorSchema } from './schema/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorDao],
  exports: [AuthorDao],
})
export class AuthorModule {}
