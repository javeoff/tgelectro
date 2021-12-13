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

  public async fetch(): Promise<ICategory[]> {
    return this.categoriesRepository.find();
  }
}
