import { Router } from 'express';
import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import StudentsController from '../controllers/StudentsController';

const studentsRouter = Router();
const studentController = new StudentsController();

studentsRouter.use(ensureAuthenticate);

studentsRouter.get('/', studentController.index);
studentsRouter.post('/', studentController.create);
studentsRouter.get('/:id', studentController.show);
studentsRouter.put('/:id', studentController.update);
studentsRouter.delete('/:id', studentController.remove);

export default studentsRouter;
