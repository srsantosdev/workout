import AppError from '@shared/errors/AppError';
import UpdateStudentService from './UpdateStudentService';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';

let fakeStudentsRepository: FakeStudentsRepository;

let updateStudentService: UpdateStudentService;

describe('Update Student', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();

    updateStudentService = new UpdateStudentService(fakeStudentsRepository);
  });

  it('should be able to update a student', async () => {
    const student = await fakeStudentsRepository.create({
      name: 'John Doe',
      document: '00000000',
      enrollment: '12345689999',
    });

    const updatedStudent = await updateStudentService.execute({
      student_id: student.id,
      name: 'John Updated Doe',
      status: 'canceled',
    });

    expect(updatedStudent.name).toBe('John Updated Doe');
    expect(updatedStudent.document).toBe('00000000');
    expect(updatedStudent.status).toBe('canceled');
  });

  it('should not be able to update a non-existing student', async () => {
    await expect(
      updateStudentService.execute({
        student_id: 'non-existing-student',
        name: 'John Doe',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
