import { uuid } from 'uuidv4';

import ICreateTrainingDTO from '@modules/trainings/dtos/ICreateTrainingDTO';
import Training from '@modules/trainings/infra/typeorm/entities/Training';
import ITrainingsRepository from '../ITrainingsRepository';

export default class FakeTrainingsRepository implements ITrainingsRepository {
  private trainings: Training[] = [];

  public async create({
    title,
    type,
    exercises,
  }: ICreateTrainingDTO): Promise<Training> {
    const training = new Training();

    Object.assign(training, { id: uuid(), title, type, exercises });

    this.trainings.push(training);

    return training;
  }

  public async all(): Promise<Training[]> {
    return this.trainings;
  }

  public async findById(id: string): Promise<Training | undefined> {
    const findTraining = this.trainings.find(training => training.id === id);

    return findTraining;
  }

  public async save(training: Training): Promise<Training> {
    const findIndex = this.trainings.findIndex(
      findTraining => findTraining.id === training.id,
    );

    this.trainings[findIndex] = training;

    return training;
  }

  public async remove(id: string): Promise<void> {
    const findIndex = this.trainings.findIndex(
      findTraining => findTraining.id === id,
    );

    this.trainings.splice(findIndex, 1);
  }
}
