import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Berita {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  judul: string;

  @Column()
  isi: string;

  @Column()
  kategori: string;

  @Column()
  tanggal: string;

  @Column({ nullable: true })
  foto: string;
}
