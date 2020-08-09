import AppError from '@shared/errors/AppError';

import FakeExercisesRepository from '../repositories/fakes/FakeExercisesRepository';
import CreateExerciseService from './CreateExerciseService';

let createExerciseService: CreateExerciseService;
let fakeExercisesRepository: FakeExercisesRepository;

describe('Create Exercise', () => {
  beforeEach(() => {
    fakeExercisesRepository = new FakeExercisesRepository();
    createExerciseService = new CreateExerciseService(fakeExercisesRepository);
  });

  it('should be able to create a new exercise', async () => {
    const exercise = await createExerciseService.execute({
      name: 'Supino Reto',
    });

    expect(exercise).toHaveProperty('id');
    expect(exercise.name).toBe('Supino Reto');
  });

  it('should not be able to create a new exercise same name from another', async () => {
    await createExerciseService.execute({
      name: 'Supino Reto',
    });

    await expect(
      createExerciseService.execute({
        name: 'Supino Reto',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
