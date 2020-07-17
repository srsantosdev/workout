import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    username,
    password,
    occupation,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      username,
      password,
      occupation,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);
    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { username },
    });

    return user;
  }

  public async remove(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
