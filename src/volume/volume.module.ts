import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { VolumeController } from './volume.controller';
import { VolumeService } from './volume.service';
import { VolumeDao } from './volume.dao';
import { Volume, VolumeSchema } from './schema/lightnovel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Volume.name, schema: VolumeSchema }]),
  ],
  controllers: [VolumeController],
  providers: [VolumeService, VolumeDao],
  exports: [VolumeDao],
})
export class VolumeModule {}
