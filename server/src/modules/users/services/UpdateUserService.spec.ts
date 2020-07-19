import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserService from './UpdateUserService';

describe('Update User', () => {
  it('should be able to update a user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456789',
      occupation: 'Administrador',
    });

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      updatedData: {
        name: 'Updated User',
        occupation: 'Manager',
      },
    });

    expect(user.id).toEqual(updatedUser.id);
    expect(updatedUser.name).toBe('Updated User');
    expect(updatedUser.occupation).toBe('Manager');
  });

  it('should not be able to update non existing user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      updateUserService.execute({
        user_id: 'non-existing',
        updatedData: {
          name: 'Non Existing',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password of user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const updateUserService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456789',
      occupation: 'Administrador',
    });

    const updatedUser = await updateUserService.execute({
      user_id: user.id,
      updatedData: {
        password: 'new-password',
      },
    });

    expect(user.id).toEqual(updatedUser.id);
    expect(updatedUser.password).toBe('new-password');
  });
});
