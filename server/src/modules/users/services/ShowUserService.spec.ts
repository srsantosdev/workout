import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowUserService from './ShowUserService';

let fakeUsersRepository: FakeUsersRepository;
let showUserService: ShowUserService;

describe('Show User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserService = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to show a specific user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456789',
      occupation: 'Administrador',
    });

    const findUser = await showUserService.execute({ user_id: user.id });

    expect(findUser).toEqual(user);
  });

  it('should not be able to show a non-existing user', async () => {
    await expect(
      showUserService.execute({ user_id: 'non-existing-user' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
