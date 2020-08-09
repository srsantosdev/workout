import Exercise from '@modules/exercises/infra/typeorm/entities/Exercise';

export default interface ICreateTrainingDTO {
  title: string;
  type: string;
  exercises: Exercise[];
}
