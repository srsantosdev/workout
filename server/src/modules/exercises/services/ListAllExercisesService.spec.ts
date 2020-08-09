import FakeExercisesRepository from '../repositories/fakes/FakeExercisesRepository';
import ListAllExercisesService from './ListAllExercisesService';

let listAllExercisesService: ListAllExercisesService;
let fakeExercisesRepository: FakeExercisesRepository;

describe('List Exercises', () => {
  beforeEach(() => {
    fakeExercisesRepository = new FakeExercisesRepository();
    listAllExercisesService = new ListAllExercisesService(
      fakeExercisesRepository,
    );
  });

  it('should be able to list all exercises', async () => {
    const createdExercise1 = await fakeExercisesRepository.create({
      name: 'Supino Reto',
    });

    const createdExercise2 = await fakeExercisesRepository.create({
      name: 'Supino Inclinado',
    });

    const exercises = await listAllExercisesService.execute();

    expect(exercises).toEqual([createdExercise1, createdExercise2]);
  });
});
