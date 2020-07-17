import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  username: string;
  password: string;
  name: string;
  occupation: string;
  image_url?: string;
}

export default class CreateUserService {
  public async execute({
    name,
    username,
    occupation,
    password,
    image_url,
  }: IRequest): Promise<User> {}
}
