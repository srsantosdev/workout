import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IExercisesRepository from '@modules/exercises/repositories/IExercisesRepository';

interface IRequest {
  exercise_id: string;
}

@injectable()
export default class RemoveExerciseService {
  constructor(
    @inject('ExercisesRepository')
    private exercisesRepository: IExercisesRepository,
  ) {}

  public async execute({ exercise_id }: IRequest): Promise<void> {
    const exercise = await this.exercisesRepository.findById(exercise_id);

    if (!exercise) {
      throw new AppError('Exercise not found.');
    }

    await this.exercisesRepository.remove(exercise_id);
  }
}
