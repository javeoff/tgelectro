import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IFabricator } from '@server/Fabricators/types/IFabricator';
import { Product } from '@server/Products/entities/product.entity';
import { IProduct } from '@server/Products/types/IProduct';

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

  @OneToMany(() => Product, (product) => product.fabricator)
  public products!: IProduct[];
}
