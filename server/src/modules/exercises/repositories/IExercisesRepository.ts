import ICreateExerciseDTO from '@modules/exercises/dtos/ICreateExerciseDTO';
import Exercise from '../infra/typeorm/entities/Exercise';

export default interface IExercisesRepository {
  create(data: ICreateExerciseDTO): Promise<Exercise>;
  findByName(name: string): Promise<Exercise | undefined>;
  findById(id: string): Promise<Exercise | undefined>;
  all(): Promise<Exercise[]>;
  remove(exercise_id: string): Promise<void>;
}
