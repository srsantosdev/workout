import AppError from '@shared/errors/AppError';

import CreateStudentService from './CreateStudentService';

import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';
import FakeRandomEnrollmentProvider from '../providers/RandomEnrollment/fakes/FakeRandomEnrollment';

let fakeStudentsRepository: FakeStudentsRepository;
let fakeRandomEnrollmentProvider: FakeRandomEnrollmentProvider;

let createStudentService: CreateStudentService;

describe('Create Student', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeRandomEnrollmentProvider = new FakeRandomEnrollmentProvider();

    createStudentService = new CreateStudentService(
      fakeStudentsRepository,
      fakeRandomEnrollmentProvider,
    );
  });

  it('should be able to create a new student', async () => {
    const student = await createStudentService.execute({
      name: 'John Doe',
      document: '000000000000',
    });

    expect(student).toHaveProperty('id');
    expect(student.name).toBe('John Doe');
  });

  it('should not be able to create a new student with same document as another', async () => {
    await createStudentService.execute({
      name: 'John Doe',
      document: '000000000000',
    });

    await expect(
      createStudentService.execute({
        name: 'John Tre',
        document: '000000000000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
