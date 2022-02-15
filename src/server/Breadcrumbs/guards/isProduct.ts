import { Product } from '@server/Products/entities/product.entity';

export const isProduct = (entity: unknown): entity is Product =>
  entity !== null && typeof entity === 'object' && 'price' in entity;
