import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Training from '@modules/trainings/infra/typeorm/entities/Training';
import Exercise from '@modules/exercises/infra/typeorm/entities/Exercise';

@Entity('training_exercises')
export default class TrainingsExercices {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Exercise)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @ManyToOne(() => Training)
  @JoinColumn({ name: 'training_id' })
  training: Training;

  @Column()
  exercise_id: string;

  @Column()
  training_id: string;

  @Column()
  name: string;

  @Column()
  series: number;

  @Column()
  repetitions: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
