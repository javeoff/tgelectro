import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ICategory } from '@server/Categories/types/ICategory';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { Product } from '@server/Products/entities/product.entity';

@Entity({ name: 'categories' })
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public link!: string;

  @ManyToMany(() => Fabricator)
  @JoinTable()
  public fabricators!: Fabricator[];

  @OneToMany(() => Product, (product) => product.category)
  public products!: Product[];
}
