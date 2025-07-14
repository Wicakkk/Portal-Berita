import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Berita } from './berita/berita.entity';
import { BeritaModule } from './berita/berita.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blog.sqlite',
      entities: [Berita],
      synchronize: true, // auto create table
    }),
    BeritaModule,
  ],
})
export class AppModule {}
