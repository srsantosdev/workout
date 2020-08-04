import ListStudentsService from './ListStudentsService';
import FakeStudentsRepository from '../repositories/fakes/FakeStudentsRepository';

let fakeStudentsRepository: FakeStudentsRepository;

let listStudentService: ListStudentsService;

describe('List Students', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();

    listStudentService = new ListStudentsService(fakeStudentsRepository);
  });

  it('should be able to list all students', async () => {
    const student1 = await fakeStudentsRepository.create({
      name: 'John Tre',
      document: '11111111111',
      enrollment: '01010101',
    });

    const student2 = await fakeStudentsRepository.create({
      name: 'John Doe',
      document: '55555555555',
      enrollment: '000010011',
    });

    const student3 = await fakeStudentsRepository.create({
      name: 'John On',
      document: '10101010100',
      enrollment: '00440011',
    });

    const students = await listStudentService.execute();

    expect(students).toEqual([student1, student2, student3]);
  });
});
