import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IProduct } from '@server/Products/types/IProduct';
import { Category } from '@server/Categories/entities/category.entity';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';
import { ICategory } from '@server/Categories/types/ICategory';
import { IFabricator } from '@server/Fabricators/types/IFabricator';

@Entity({
  name: 'products',
})
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public vendor!: string;

  @Column()
  public alternativeVendor!: string;

  @Column()
  public imageUrl!: string;

  @Column()
  public description!: string;

  @Column()
  public price!: number;

  @ManyToOne(() => Category, (category) => category.products)
  public category!: ICategory;

  @ManyToOne(() => Fabricator, (fabricator) => fabricator.products)
  public fabricator!: IFabricator;
}
