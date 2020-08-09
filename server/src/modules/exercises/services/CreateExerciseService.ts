import { inject, injectable } from 'tsyringe';

import Exercise from '@modules/exercises/infra/typeorm/entities/Exercise';
import IExercisesRepository from '@modules/exercises/repositories/IExercisesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateExerciseService {
  constructor(
    @inject('ExercisesRepository')
    private exercisesRepository: IExercisesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Exercise> {
    const findExercise = await this.exercisesRepository.findByName(name);

    if (findExercise) {
      throw new AppError('Exercise with this name already exists.');
    }

    const exercise = await this.exercisesRepository.create({
      name,
    });

    return exercise;
  }
}
