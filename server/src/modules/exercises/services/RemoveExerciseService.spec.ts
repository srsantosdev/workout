import AppError from '@shared/errors/AppError';
import FakeExercisesRepository from '../repositories/fakes/FakeExercisesRepository';
import RemoveExerciseService from './RemoveExerciseService';

let removeExerciseService: RemoveExerciseService;
let fakeExercisesRepository: FakeExercisesRepository;

describe('Remove Exercise', () => {
  beforeEach(() => {
    fakeExercisesRepository = new FakeExercisesRepository();
    removeExerciseService = new RemoveExerciseService(fakeExercisesRepository);
  });

  it('should be able to delete a specific exercise', async () => {
    const createdExercise = await fakeExercisesRepository.create({
      name: 'Supino Reto',
    });

    await removeExerciseService.execute({
      exercise_id: createdExercise.id,
    });

    const findExercise = await fakeExercisesRepository.findById(
      createdExercise.id,
    );

    expect(findExercise).toBeFalsy();
  });

  it('should not be able to delete a non-existing exercise', async () => {
    await expect(
      removeExerciseService.execute({
        exercise_id: 'non-existing-exercise',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
