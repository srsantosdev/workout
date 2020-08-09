import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateExerciseService from '@modules/exercises/services/CreateExerciseService';
import ListAllExercisesService from '@modules/exercises/services/ListAllExercisesService';
import ShowExerciseService from '@modules/exercises/services/ShowExerciseService';
import RemoveExerciseService from '@modules/exercises/services/RemoveExerciseService';

export default class ExercisesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createExerciseService = container.resolve(CreateExerciseService);

    const exercise = await createExerciseService.execute({ name });

    return response.json(exercise);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllExercisesService = container.resolve(ListAllExercisesService);

    const exercises = await listAllExercisesService.execute();

    return response.json(exercises);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showExerciseService = container.resolve(ShowExerciseService);

    const exercise = await showExerciseService.execute({ exercise_id: id });

    return response.json(exercise);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeExerciseService = container.resolve(RemoveExerciseService);

    await removeExerciseService.execute({ exercise_id: id });

    return response.status(204).json();
  }
}
