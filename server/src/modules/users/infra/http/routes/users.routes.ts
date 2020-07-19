import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const upload = multer(uploadConfig);

const userRoutes = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

userRoutes.post('/users', usersController.create);
userRoutes.delete('/users/:id', usersController.remove);
userRoutes.put('/users/:id', usersController.update);

userRoutes.patch(
  '/users/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRoutes;
