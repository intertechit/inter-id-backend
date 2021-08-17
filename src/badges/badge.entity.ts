import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Type } from './type.enum';

@Entity()
export class Badge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column({ type: 'enum', enum: Type })
  type: Type;
}
