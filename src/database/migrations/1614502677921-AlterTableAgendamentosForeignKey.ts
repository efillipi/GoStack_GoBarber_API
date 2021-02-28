import {MigrationInterface, QueryRunner,TableForeignKey} from "typeorm";

export class AlterTableAgendamentosForeignKey1614502677921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "agendamentos",
            new TableForeignKey({
                columnNames: ["provider_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                name: "fk_agendamentos_provider_id",
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            "users",
            "fk_agendamentos_provider_id"
        );
    }

}
