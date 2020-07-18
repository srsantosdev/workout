import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
export default class RemoveUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findUser = await this.usersRepository.findById(id);

    if (!findUser) {
      throw new AppError('User not found.');
    }

    await this.usersRepository.remove(id);
  }
}
