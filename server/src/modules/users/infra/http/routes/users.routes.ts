import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();

const userRoutes = Router();

export default userRoutes;
