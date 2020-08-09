import { uuid } from 'uuidv4';

import ICreateExerciseDTO from '@modules/exercises/dtos/ICreateExerciseDTO';
import Exercise from '@modules/exercises/infra/typeorm/entities/Exercise';
import IExercisesRepository from '../IExercisesRepository';

export default class FakeExercisesRepository implements IExercisesRepository {
  private exercises: Exercise[] = [];

  public async create({ name }: ICreateExerciseDTO): Promise<Exercise> {
    const exercise = new Exercise();

    Object.assign(exercise, { id: uuid(), name });

    this.exercises.push(exercise);

    return exercise;
  }

  public async all(): Promise<Exercise[]> {
    return this.exercises;
  }

  public async findById(id: string): Promise<Exercise | undefined> {
    const findExercise = this.exercises.find(exercise => exercise.id === id);

    return findExercise;
  }

  public async findByName(name: string): Promise<Exercise | undefined> {
    const findExercise = this.exercises.find(
      exercise => exercise.name === name,
    );

    return findExercise;
  }

  public async remove(exercise_id: string): Promise<void> {
    const findIndex = this.exercises.findIndex(exercise => exercise);

    if (findIndex !== -1) {
      this.exercises.splice(findIndex, 1);
    }
  }
}
