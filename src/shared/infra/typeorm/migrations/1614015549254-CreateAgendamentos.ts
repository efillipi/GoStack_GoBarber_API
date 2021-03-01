import { table } from "console";
import { Column, MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointments1614015549254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    {
                        name: 'provider_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'dateAppointment',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'update_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('appointments')
    }

}
