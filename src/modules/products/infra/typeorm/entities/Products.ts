/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-shadow
import Category from '@modules/categorys/infra/typeorm/entities/Category';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @JoinColumn({ name: 'categoryId' })
  @ManyToOne(() => Category, (categorys) => categorys.id)
  category: Category;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  expirationDate: Date;

  @Column()
  image: string;

  @Column()
  categoryId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
