import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'en progreso', 'completada'],
    nullable: true
  })
  estado: 'pendiente' | 'en progreso' | 'completada';
}
