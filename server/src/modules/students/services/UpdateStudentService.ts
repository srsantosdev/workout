import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Student from '@modules/students/infra/typeorm/entities/Student';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

interface IRequest {
  student_id: string;
  name?: string;
  status?: 'active' | 'overdue' | 'canceled';
  document?: string;
}

@injectable()
export default class CreateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({
    student_id,
    name,
    status,
    document,
  }: IRequest): Promise<Student> {
    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new AppError('Student not found.');
    }

    student.name = name || student.name;
    student.status = status || student.status;
    student.document = document || student.document;

    const updatedStudent = await this.studentsRepository.save(student);

    return updatedStudent;
  }
}
