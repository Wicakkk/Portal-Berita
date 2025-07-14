import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Berita } from './berita.entity';

@Injectable()
export class BeritaService {
  constructor(
    @InjectRepository(Berita)
    private readonly repo: Repository<Berita>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<Berita>) {
    return this.repo.save(data);
  }

  update(id: number, data: Partial<Berita>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
