import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import RemoveUserService from '@modules/users/services/RemoveUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password, username, occupation, manager } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      password,
      username,
      occupation,
      manager,
    });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({ user_id });

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, password, occupation, username, manager } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({
      user_id: id,
      updatedData: { name, password, occupation, username, manager },
    });

    return response.json(user);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeUser = container.resolve(RemoveUserService);

    await removeUser.execute(id);

    return response.status(204).send();
  }
}
