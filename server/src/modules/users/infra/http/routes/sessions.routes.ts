import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionRoutes = Router();
const sessionsController = new SessionsController();

sessionRoutes.post('/session', sessionsController.create);

export default sessionRoutes;
