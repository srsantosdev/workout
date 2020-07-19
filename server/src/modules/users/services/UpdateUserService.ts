import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  updatedData: {
    username?: string;
    password?: string;
    name?: string;
    occupation?: string;
  };
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, updatedData }: IRequest): Promise<User> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('User not found.');
    }

    if (updatedData.password) {
      const hashedPassword = await this.hashProvider.generateHash(
        updatedData.password,
      );

      findUser.password = hashedPassword;
    }

    const updatedUser = {
      ...findUser,
      ...updatedData,
    };

    const user = await this.usersRepository.save(updatedUser);

    return user;
  }
}
