import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CategoriesMigration1639354601 implements MigrationInterface {
  public name = 'CategoriesMigration1639354601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'link',
            type: 'varchar',
          },
          {
            name: 'fabricators',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}
