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

userRoutes.get('/', usersController.index);
userRoutes.post('/', usersController.create);
userRoutes.get('/:id', usersController.show);
userRoutes.put('/:id', usersController.update);
userRoutes.delete('/:id', usersController.remove);

userRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  upload.single('avatar'),
  userAvatarController.update,
);

export default userRoutes;
