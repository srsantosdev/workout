import { inject, injectable } from 'tsyringe';

import Exercise from '@modules/exercises/infra/typeorm/entities/Exercise';
import IExercisesRepository from '@modules/exercises/repositories/IExercisesRepository';

@injectable()
export default class ListAllExercisesService {
  constructor(
    @inject('ExercisesRepository')
    private exercisesRepository: IExercisesRepository,
  ) {}

  public async execute(): Promise<Exercise[]> {
    const exercises = await this.exercisesRepository.all();

    return exercises;
  }
}
