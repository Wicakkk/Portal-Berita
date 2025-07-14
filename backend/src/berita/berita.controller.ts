import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BeritaService } from './berita.service';
import { Berita } from './berita.entity';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('berita')
export class BeritaController {
  constructor(private readonly service: BeritaService) {}

  // GET semua berita
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // GET berita berdasarkan ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const data = {
      ...body,
      foto: file ? `/uploads/${file.filename}` : '', // simpan path gambar
    };
    return this.service.create(data);
  }

  // PUT update berita berdasarkan ID
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Berita) {
    return this.service.update(+id, data);
  }

  // DELETE berita berdasarkan ID
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
