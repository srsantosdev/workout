import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTrainingsExercices1596910588217
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'training_exercises',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'training_id',
            type: 'uuid',
          },
          {
            name: 'exercise_id',
            type: 'uuid',
          },
          {
            name: 'series',
            type: 'integer',
          },
          {
            name: 'repetitions',
            type: 'integer',
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

    await queryRunner.createForeignKeys('training_exercises', [
      new TableForeignKey({
        name: 'TrainingID',
        columnNames: ['training_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'trainings',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'ExerciseID',
        columnNames: ['exercise_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'exercises',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('training_exercises', 'TrainingID');
    await queryRunner.dropForeignKey('training_exercises', 'ExerciseID');
    await queryRunner.dropTable('training_exercises');
  }
}
