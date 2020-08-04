import { uuid } from 'uuidv4';

import Student from '@modules/students/infra/typeorm/entities/Student';
import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import IStudentsRepository from '../IStudentsRepository';

export default class FakeStudentsRepository implements IStudentsRepository {
  private students: Student[] = [];

  public async create({
    name,
    enrollment,
    document,
  }: ICreateStudentDTO): Promise<Student> {
    const student = new Student();

    Object.assign(student, {
      id: uuid(),
      status: 'active',
      name,
      enrollment,
      document,
    });
    this.students.push(student);

    return student;
  }

  public async all(): Promise<Student[]> {
    return this.students;
  }

  public async findById(student_id: string): Promise<Student | undefined> {
    const findStudent = this.students.find(
      student => student.id === student_id,
    );

    return findStudent;
  }

  public async findByEnrollment(
    enrollment: string,
  ): Promise<Student | undefined> {
    const findStudent = this.students.find(
      student => student.enrollment === enrollment,
    );

    return findStudent;
  }

  public async findByDocument(document: string): Promise<Student | undefined> {
    const findStudent = this.students.find(
      student => student.document === document,
    );

    return findStudent;
  }

  public async filterByStatus(status: string): Promise<Student[]> {
    const filteredStudents = this.students.filter(
      student => student.status === status,
    );

    return filteredStudents;
  }

  public async save(user: Student): Promise<Student> {
    const findIndex = this.students.findIndex(
      student => student.id === user.id,
    );

    this.students[findIndex] = user;
    return user;
  }

  public async remove(id: string): Promise<void> {
    const findIndex = this.students.findIndex(student => student.id === id);

    this.students.splice(findIndex, 1);
  }
}
