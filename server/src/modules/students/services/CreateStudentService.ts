import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Student from '@modules/students/infra/typeorm/entities/Student';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import IRandomEnrollment from '../providers/RandomEnrollment/models/IRandomEnrollment';

interface IRequest {
  name: string;
  document: string;
}

@injectable()
export default class CreateStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,

    @inject('RandomEnrollmentProvider')
    private randomEnrollmentProvider: IRandomEnrollment,
  ) {}

  public async execute({ name, document }: IRequest): Promise<Student> {
    const enrollment = this.randomEnrollmentProvider.generated();

    const findDocument = await this.studentsRepository.findByDocument(document);

    if (findDocument) {
      throw new AppError('Student already registered.');
    }

    const student = await this.studentsRepository.create({
      name,
      document,
      enrollment,
    });

    return student;
  }
}
