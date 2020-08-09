import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import TrainingsExercices from './TrainingsExercices';

@Entity('trainings')
export default class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @OneToMany(
    () => TrainingsExercices,
    trainingExercices => trainingExercices.training,
    {
      eager: true,
      cascade: true,
    },
  )
  exercises: TrainingsExercices[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
