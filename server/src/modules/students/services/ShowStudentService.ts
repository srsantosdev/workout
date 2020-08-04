import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Student from '@modules/students/infra/typeorm/entities/Student';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

interface IRequest {
  student_id: string;
}

@injectable()
export default class ShowStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({ student_id }: IRequest): Promise<Student> {
    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new AppError('Student not found.');
    }

    return student;
  }
}
