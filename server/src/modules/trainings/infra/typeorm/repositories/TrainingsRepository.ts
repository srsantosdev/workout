import { getRepository, Repository } from 'typeorm';

import ICreateTrainingDTO from '@modules/trainings/dtos/ICreateTrainingDTO';
import Training from '@modules/trainings/infra/typeorm/entities/Training';
import ITrainingsRepository from '@modules/trainings/repositories/ITrainingsRepository';

export default class TrainingsRepository implements ITrainingsRepository {
  private ormRepository: Repository<Training>;

  constructor() {
    this.ormRepository = getRepository(Training);
  }

  public async create({
    title,
    type,
    exercises,
  }: ICreateTrainingDTO): Promise<Training> {
    const training = this.ormRepository.create({
      title,
      type,
      exercises,
    });

    await this.ormRepository.save(training);

    return training;
  }

  public async all(): Promise<Training[]> {
    const trainings = await this.ormRepository.find();

    return trainings;
  }

  public async findById(id: string): Promise<Training | undefined> {
    const findTraining = await this.ormRepository.findOne(id);

    return findTraining;
  }

  public async save(training: Training): Promise<Training> {
    const updatedTraining = await this.ormRepository.save(training);

    return updatedTraining;
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
