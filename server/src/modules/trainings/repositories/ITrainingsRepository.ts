import Training from '../infra/typeorm/entities/Training';
import ICreateTrainingDTO from '../dtos/ICreateTrainingDTO';

export default interface ITrainingsRepository {
  create(data: ICreateTrainingDTO): Promise<Training>;
  findById(id: string): Promise<Training | undefined>;
  save(training: Training): Promise<Training>;
  all(): Promise<Training[]>;
  remove(id: string): Promise<void>;
}
