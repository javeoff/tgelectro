import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '@server/Categories/entities/category.entity';
import { ICategory } from '@server/Categories/types/ICategory';

@Injectable()
export class CategoriesFetcher {
  public constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  public getItem(id: number): Promise<ICategory> {
    return this.categoriesRepository.findOneOrFail({ id });
  }

  public async fetch(): Promise<ICategory[]> {
    return this.categoriesRepository.find();
  }

  public getLength(): Promise<number> {
    return this.categoriesRepository.count();
  }

  public update(entity: Category): Promise<Category> {
    return this.categoriesRepository.save(entity);
  }

  public remove(entity: Category): Promise<Category> {
    return this.categoriesRepository.remove(entity);
  }
}
