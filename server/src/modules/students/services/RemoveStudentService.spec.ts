import AppError from '@shared/errors/AppError';

import RemoveStudentService from './RemoveStudentService';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';

let fakeStudentsRepository: FakeStudentsRepository;

let removeStudentService: RemoveStudentService;

describe('Remove Student', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();

    removeStudentService = new RemoveStudentService(fakeStudentsRepository);
  });

  it('should be able to remove a student', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'John Doe',
      document: '0000000000',
      enrollment: '0123456789',
    });

    await removeStudentService.execute({ student_id: student.id });

    const findStudent = await fakeStudentsRepository.findById(student.id);

    expect(findStudent).toBeFalsy();
  });

  it('should not be able to remove a non-existing student', async () => {
    await expect(
      removeStudentService.execute({ student_id: 'non-existing-student' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
