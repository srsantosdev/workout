import { container } from 'tsyringe';

import '@modules/users/providers';
import '@modules/students/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IStudentRepository from '@modules/students/repositories/IStudentsRepository';
import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';

import IExercisesRepository from '@modules/exercises/repositories/IExercisesRepository';
import ExercisesRepository from '@modules/exercises/infra/typeorm/repositories/ExercisesRepository';

import ITrainingsRepository from '@modules/trainings/repositories/ITrainingsRepository';
import TrainingsRepository from '@modules/trainings/infra/typeorm/repositories/TrainingsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IStudentRepository>(
  'StudentsRepository',
  StudentsRepository,
);

container.registerSingleton<IExercisesRepository>(
  'ExercisesRepository',
  ExercisesRepository,
);

container.registerSingleton<ITrainingsRepository>(
  'TrainingsRepository',
  TrainingsRepository,
);
