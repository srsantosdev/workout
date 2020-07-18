import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  username: string;
  password: string;
  name: string;
  occupation: string;
  image_url?: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    username,
    occupation,
    password,
    image_url,
  }: IRequest): Promise<User> {
    const existingUser = await this.usersRepository.findByUsername(username);

    if (existingUser) {
      throw new AppError('Username already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      username,
      occupation,
      password: hashedPassword,
      image_url,
    });

    return user;
  }
}
