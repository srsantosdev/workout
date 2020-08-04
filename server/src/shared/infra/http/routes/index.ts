import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import studentsRoutes from '@modules/students/infra/http/routes/student.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/students', studentsRoutes);
router.use('/sessions', sessionsRoutes);

export default router;
