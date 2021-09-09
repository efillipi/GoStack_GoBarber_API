import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterAppointmentAddApprovred1631198147786
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'approved',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'approved');
  }
}
