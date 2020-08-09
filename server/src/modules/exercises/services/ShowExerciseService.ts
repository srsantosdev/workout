import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Exercise from '@modules/exercises/infra/typeorm/entities/Exercise';
import IExercisesRepository from '@modules/exercises/repositories/IExercisesRepository';

interface IRequest {
  exercise_id: string;
}

@injectable()
export default class ShowExerciseService {
  constructor(
    @inject('ExercisesRepository')
    private exercisesRepository: IExercisesRepository,
  ) {}

  public async execute({ exercise_id }: IRequest): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findById(exercise_id);

    if (!exercise) {
      throw new AppError('Exercise not found.');
    }

    return exercise;
  }
}
