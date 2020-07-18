import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import RemoveUserService from './RemoveUserService';

describe('Remove User', () => {
  it('should be able to delete a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const removeUserService = new RemoveUserService(fakeUsersRepository);

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456789',
      occupation: 'Administrador',
    });

    await removeUserService.execute(user.id);

    const findUser = await fakeUsersRepository.findById(user.id);

    expect(findUser).toBeFalsy();
  });

  it('should not be able to delete a user that does not exist', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const removeUserService = new RemoveUserService(fakeUsersRepository);

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456789',
      occupation: 'Administrador',
    });

    await removeUserService.execute(user.id);

    expect(removeUserService.execute(user.id)).rejects.toBeInstanceOf(AppError);
  });
});
