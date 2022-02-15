import {
  Connection,
  getConnection,
  InsertResult,
  MigrationInterface,
  QueryBuilder,
  QueryRunner,
} from 'typeorm';
import lineReader from 'line-reader';
import { slugify as convertToUrl } from 'transliter';

import { Product } from '@server/Products/entities/product.entity';
import { Category } from '@server/Categories/entities/category.entity';
import { Fabricator } from '@server/Fabricators/entities/fabricator.entity';

interface IJsonProduct {
  price: number;
  name: string;
  model: string;
  brand: string;
  bread_crumbs: string[];
  description: string;
}

export class ProductsMigration implements MigrationInterface {
  private connection: Connection;

  private queryBuilder: QueryBuilder<unknown>;

  private categories: Category[] = [];

  private fabricators: Fabricator[] = [];

  public name = `ProductsMigration${Date.now()}`;

  public constructor() {
    this.connection = getConnection();
    this.queryBuilder = this.connection.createQueryBuilder();
  }

  public async up(): Promise<void> {
    await this.getProducts();

    // eslint-disable-next-line no-console
    console.log('end');
  }

  protected createProduct(product: Product): Promise<InsertResult> {
    return this.queryBuilder.insert().into(Product).values(product).execute();
  }

  protected async getCategory(
    categoriesNameIdx: number,
    categoriesNames: string[],
  ): Promise<Category> {
    const categoryName = categoriesNames[categoriesNameIdx];

    if (!categoryName) {
      throw new Error('Название категории не найдено');
    }

    const category = this.categories.find(
      (entity) => entity.name === categoryName,
    );

    if (category !== undefined) {
      return category;
    }

    const parentCategory =
      categoriesNameIdx === 0
        ? undefined
        : await this.getCategory(categoriesNameIdx - 1, categoriesNames);

    const entity = new Category();

    entity.name = categoryName;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    entity.link = convertToUrl(categoryName);

    if (parentCategory) {
      entity.parent = parentCategory;
    }

    const {
      raw: { insertId },
    } = await this.queryBuilder
      .insert()
      .into(Category)
      .values(entity)
      .execute();

    entity.id = insertId;

    this.categories.push(entity);

    return {
      ...entity,
    };
  }

  protected async getFabricator(fabricatorName: string): Promise<Fabricator> {
    const fabricator = this.fabricators.find(
      (entity) => entity.name === fabricatorName,
    );

    if (fabricator !== undefined) {
      return fabricator;
    }

    const entity = new Fabricator();

    entity.name = fabricatorName;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    entity.link = convertToUrl(fabricatorName);
    entity.imageUrl = '';

    const {
      raw: { insertId },
    } = await this.queryBuilder
      .insert()
      .into(Fabricator)
      .values(entity)
      .execute();

    entity.id = insertId;

    this.fabricators.push(entity);

    return {
      ...entity,
    };
  }

  protected getProducts(): Promise<void> {
    return new Promise((resolve) => {
      let lineCounter = 0;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access

      lineReader.eachLine(
        'src/server/Products/__mock__/products.mock.txt',
        async (line: string, last, cb) => {
          if (!cb) {
            return;
          }

          const next = cb as (flag?: boolean) => void;

          lineCounter += 1;

          if (lineCounter < 4_313_421) {
            next();

            return;
          }

          // eslint-disable-next-line no-console
          console.log('LINE', lineCounter);

          if (line.includes('product error')) {
            // eslint-disable-next-line no-console
            console.log('Line is with an error');

            if (last) {
              resolve();

              return;
            }

            next();

            return;
          }

          const jsonProduct: IJsonProduct = JSON.parse(line);
          const productVendor = jsonProduct.name.split(' ')[0];

          /* eslint-disable @typescript-eslint/no-unused-vars */
          const [
            siteName,
            fabricatorsTitle,
            fabricatorName,
            ...categoriesNames
          ] = jsonProduct.bread_crumbs;
          /* eslint-enable */

          const product = new Product();

          try {
            product.fabricator = await this.getFabricator(fabricatorName);
            product.category = await this.getCategory(
              categoriesNames.length - 1,
              categoriesNames,
            );
            product.price = jsonProduct.price;
            // eslint-disable-next-line prefer-destructuring
            product.vendor = productVendor;
            product.alternativeVendor = productVendor;
            product.description = jsonProduct.description;
            product.imageUrl = '';

            await this.createProduct(product);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }

          if (!last) {
            return next();
          }

          resolve();
        },
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.resolve();
  }
}
