import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

interface IRequest {
  student_id: string;
}

@injectable()
export default class RemoveStudentService {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
  ) {}

  public async execute({ student_id }: IRequest): Promise<void> {
    const findStudent = await this.studentsRepository.findById(student_id);

    if (!findStudent) {
      throw new AppError('Student not found.');
    }

    await this.studentsRepository.remove(student_id);
  }
}
