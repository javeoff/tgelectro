import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ICategory } from '@server/Categories/types/ICategory';
import { Product } from '@server/Products/entities/product.entity';
import { IProduct } from '@server/Products/types/IProduct';

@Entity({ name: 'categories' })
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public parentId!: number;

  @Column()
  public name!: string;

  @Column()
  public link!: string;

  @OneToMany(() => Product, (product) => product.category)
  public products!: IProduct[];
}
