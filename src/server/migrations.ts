import { categories } from '../data/categories';
import { fabricators } from '../data/fabricators';
import { products } from '../data/products';
import { knex } from '@server/index';

const createCategoriesTable = async (): Promise<void> => {
  await knex.schema.createTable('categories', (table) => {
    table.increments();
    table.string('name');
    table.string('link');
    table.string('fabricators_id');
  });

  const mockCategories = categories.map((category) => ({
    name: category.name,
    link: category.link,
    fabricators_id: category.fabricators.join(', '),
  }));

  await knex.insert(mockCategories).into('categories');
};

const createFabricatorsTable = async (): Promise<void> => {
  await knex.schema.createTable('fabricators', (table) => {
    table.increments();
    table.string('name');
    table.string('link');
    table.string('image_url');
    table.string('categories_id');
  });

  const mockFabricators = fabricators.map((fabricator) => ({
    name: fabricator.name,
    link: fabricator.link,
    categories_id: fabricator.categories.join(', '),
    image_url: fabricator.imageUrl,
  }));

  await knex.insert(mockFabricators).into('fabricators');
};

const createProductsTable = async (): Promise<void> => {
  await knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('vendor');
    table.string('alternative_vendor');
    table.string('image_url');
    table.string('description');
    table.integer('price');
    table.string('category_id');
    table.string('fabricator_id');
  });

  const mockProducts = products.map((product) => ({
    vendor: product.vendor,
    description: product.description,
    price: product.price,
    category_id: product.categoryId,
    fabricator_id: product.fabricatorId,
    alternative_vendor: product.alternativeVendor,
    image_url: product.imageUrl,
  }));

  await knex.insert(mockProducts).into('products');
};

const migrationAll = async (): Promise<void> => {
  await knex.schema.dropTableIfExists('categories');
  await createCategoriesTable();
  await knex.schema.dropTableIfExists('fabricators');
  await createFabricatorsTable();
  await knex.schema.dropTableIfExists('products');
  await createProductsTable();
};

void migrationAll();
