import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456789',
      occupation: 'Administrador',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same username from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456789',
      occupation: 'Administrador',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        username: 'johndoe',
        password: '123456789',
        occupation: 'Administrador',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
