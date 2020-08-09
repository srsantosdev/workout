import AppError from '@shared/errors/AppError';

import FakeExercisesRepository from '../repositories/fakes/FakeExercisesRepository';
import ShowExerciseService from './ShowExerciseService';

let showExerciseService: ShowExerciseService;
let fakeExercisesRepository: FakeExercisesRepository;

describe('Show Exercise', () => {
  beforeEach(() => {
    fakeExercisesRepository = new FakeExercisesRepository();
    showExerciseService = new ShowExerciseService(fakeExercisesRepository);
  });

  it('should be able to show a specific exercise', async () => {
    const createdExercise = await fakeExercisesRepository.create({
      name: 'Supino Reto',
    });

    const exercise = await showExerciseService.execute({
      exercise_id: createdExercise.id,
    });

    expect(exercise).toEqual(createdExercise);
  });

  it('should not be able to show a non-existing exercise', async () => {
    await expect(
      showExerciseService.execute({
        exercise_id: 'non-existing-exercise',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
