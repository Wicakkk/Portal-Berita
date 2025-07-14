import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Berita } from './berita.entity';
import { BeritaService } from './berita.service';
import { BeritaController } from './berita.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Berita])],
  controllers: [BeritaController],
  providers: [BeritaService],
})
export class BeritaModule {}
