import { getRepository, Repository } from 'typeorm';

import ICreateExerciseDTO from '@modules/exercises/dtos/ICreateExerciseDTO';

import Exercise from '@modules/exercises/infra/typeorm/entities/Exercise';
import IExercisesRepository from '@modules/exercises/repositories/IExercisesRepository';

export default class ExercisesRepository implements IExercisesRepository {
  public ormRepository: Repository<Exercise>;

  constructor() {
    this.ormRepository = getRepository(Exercise);
  }

  public async create({ name }: ICreateExerciseDTO): Promise<Exercise> {
    const exercise = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(exercise);

    return exercise;
  }

  public async all(): Promise<Exercise[]> {
    const exercises = await this.ormRepository.find();

    return exercises;
  }

  public async findById(id: string): Promise<Exercise | undefined> {
    const exercise = await this.ormRepository.findOne(id);

    return exercise;
  }

  public async findByName(name: string): Promise<Exercise | undefined> {
    const findExercise = await this.ormRepository.findOne({
      where: { name },
    });

    return findExercise;
  }

  public async remove(exercise_id: string): Promise<void> {
    await this.ormRepository.delete(exercise_id);
  }
}
