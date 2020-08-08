import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStudents1596868708580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'enrollment',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'document',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'overdue', 'canceled'],
            default: "'active'",
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('students');
  }
}
