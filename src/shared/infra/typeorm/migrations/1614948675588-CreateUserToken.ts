import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserToken1614948675588
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_token',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'user_id',
            type: 'varchar',
          },
          {
            name: 'token',
            type: 'varchar',
            isGenerated: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'update_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user_token', 'fk_user_token_user_id');

    await queryRunner.dropTable('user_token');
  }
}
