import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
} from 'typeorm';

import { ICategory } from '@server/Categories/types/ICategory';
import { Product } from '@server/Products/entities/product.entity';
import { IProduct } from '@server/Products/types/IProduct';

@Entity({ name: 'categories' })
@Tree('closure-table')
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => Category, (category) => category.children)
  public parent!: Category;

  @OneToMany(() => Category, (category) => category.parent)
  public children!: Category[];

  @Column()
  public name!: string;

  @Column()
  public link!: string;

  @OneToMany(() => Product, (product) => product.category)
  public products!: IProduct[];
}
