import { Router } from 'express';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import ExercisesController from '../controllers/ExercisesController';

const exercisesRouter = Router();
const exercisesController = new ExercisesController();

exercisesRouter.use(ensureAuthenticate);

exercisesRouter.post('/', exercisesController.create);
exercisesRouter.get('/', exercisesController.index);
exercisesRouter.get('/:id', exercisesController.show);
exercisesRouter.delete('/:id', exercisesController.remove);

export default exercisesRouter;
