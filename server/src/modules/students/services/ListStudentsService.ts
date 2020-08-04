import { inject, injectable } from 'tsyringe';

import Student from '@modules/students/infra/typeorm/entities/Student';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

@injectable()
export default class ListStudentsService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute(): Promise<Student[]> {
    const students = await this.studentsRepository.all();

    return students;
  }
}
