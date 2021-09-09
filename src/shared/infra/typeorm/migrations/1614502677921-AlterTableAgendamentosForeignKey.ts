import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AlterTableAppointmentsForeignKey1614502677921
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'fk_appointments_provider_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'appointments',
      'fk_appointments_provider_id',
    );
  }
}
