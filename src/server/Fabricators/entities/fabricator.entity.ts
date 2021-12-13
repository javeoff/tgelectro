import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { Category } from '@server/Categories/entities/category.entity';
import { Product } from '@server/Products/entities/product.entity';

@Entity({
  name: 'fabricators',
})
export class Fabricator implements IFabricator {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public imageUrl!: string;

  @Column()
  public link!: string;

  @ManyToMany(() => Category)
  @JoinTable()
  public categories!: Category[];

  @OneToMany(() => Product, (product) => product.category)
  public products!: Product[];
}
