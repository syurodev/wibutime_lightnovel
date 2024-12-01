import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entity/artist.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ArtistDao {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  get repository(): Repository<Artist> {
    return this.artistRepository;
  }

  async findOne(id: number): Promise<Artist> {
    return await this.artistRepository.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<Artist> {
    return await this.artistRepository.findOne({
      where: { name },
    });
  }

  async save(
    data: Partial<Artist>,
    entityManager?: EntityManager,
  ): Promise<Artist> {
    const manager: EntityManager =
      entityManager || this.artistRepository.manager;

    const artist: Artist = manager.create(Artist, data);
    return await manager.save(artist);
  }
}
