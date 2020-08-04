import AppError from '@shared/errors/AppError';

import ShowStudentService from './ShowStudentService';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';

let fakeStudentsRepository: FakeStudentsRepository;

let showStudentService: ShowStudentService;

describe('Show Student', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();

    showStudentService = new ShowStudentService(fakeStudentsRepository);
  });

  it('should be able to show a student', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'John Doe',
      document: '00000000000',
      enrollment: '1234567890',
    });

    const findStudent = await showStudentService.execute({
      student_id: student.id,
    });

    expect(findStudent.id).toBe(student.id);
    expect(findStudent.name).toBe('John Doe');
  });

  it('should not be able to show a non-existing student', async () => {
    await expect(
      showStudentService.execute({
        student_id: 'non-existing-student',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
