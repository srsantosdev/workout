import Student from '../infra/typeorm/entities/Student';

import ICreateStudentDTO from '../dtos/ICreateStudentDTO';

export default interface IStudentsRepository {
  findById(student_id: string): Promise<Student | undefined>;
  findByDocument(document: string): Promise<Student | undefined>;
  findByEnrollment(enrollment: string): Promise<Student | undefined>;
  filterByStatus(status: string): Promise<Student[]>;
  create(data: ICreateStudentDTO): Promise<Student>;
  save(student: Student): Promise<Student>;
  all(): Promise<Student[]>;
  remove(id: string): Promise<void>;
}
