import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListUsersService from './ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsersService: ListUsersService;

describe('List Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsersService = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456789',
      occupation: 'Administrador',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      username: 'johntre',
      password: '123456789',
      occupation: 'Administrador',
    });

    const users = await listUsersService.execute();

    expect(users).toEqual([user1, user2]);
  });
});
