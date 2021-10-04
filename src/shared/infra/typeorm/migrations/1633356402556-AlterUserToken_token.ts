import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserTokenToken1633356402556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_token', 'token');
    await queryRunner.addColumn(
      'user_token',
      new TableColumn({
        name: 'token',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_token', 'token');
    await queryRunner.addColumn(
      'user_token',
      new TableColumn({
        name: 'token',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );
  }
}
