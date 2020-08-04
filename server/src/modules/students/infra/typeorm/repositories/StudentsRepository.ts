import { getRepository, Repository } from 'typeorm';

import Student from '@modules/students/infra/typeorm/entities/Student';
import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

export default class FakeStudentsRepository implements IStudentsRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async create({
    name,
    enrollment,
    document,
  }: ICreateStudentDTO): Promise<Student> {
    const student = this.ormRepository.create({ name, enrollment, document });

    await this.ormRepository.save(student);

    return student;
  }

  public async all(): Promise<Student[]> {
    const students = await this.ormRepository.find();

    return students;
  }

  public async findById(student_id: string): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne(student_id);

    return student;
  }

  public async findByEnrollment(
    enrollment: string,
  ): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne({
      where: { enrollment },
    });

    return student;
  }

  public async findByDocument(document: string): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne({
      where: { document },
    });

    return student;
  }

  public async filterByStatus(status: string): Promise<Student[]> {
    const students = await this.ormRepository.find({
      where: { status },
    });

    return students;
  }

  public async save(student: Student): Promise<Student> {
    await this.ormRepository.save(student);

    return student;
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
