import { SnakeCasedProperties } from 'type-fest';

import { IProduct } from '@common/types/IProduct';
import { knex } from '@server/index';

type IServerProduct = SnakeCasedProperties<IProduct>;

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await knex('products').select('*');

  return response.map((product: IServerProduct) => ({
    vendor: product.vendor,
    alternativeVendor: product.alternative_vendor,
    imageUrl: product.image_url,
    description: product.description,
    price: product.price,
    categoryId: product.category_id,
    fabricatorId: product.fabricator_id,
  }));
};
