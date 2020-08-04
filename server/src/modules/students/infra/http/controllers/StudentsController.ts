import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStudentService from '@modules/students/services/CreateStudentService';
import ListStudentsService from '@modules/students/services/ListStudentsService';
import ShowStudentService from '@modules/students/services/ShowStudentService';
import UpdateStudentService from '@modules/students/services/UpdateStudentService';
import RemoveStudentService from '@modules/students/services/RemoveStudentService';

export default class StudentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, document } = request.body;

    const createStudentService = container.resolve(CreateStudentService);

    const student = await createStudentService.execute({ document, name });

    return response.json(student);
  }

  public async index(_: Request, response: Response): Promise<Response> {
    const listStudentsService = container.resolve(ListStudentsService);

    const students = await listStudentsService.execute();

    return response.json(students);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showStudentService = container.resolve(ShowStudentService);

    const student = await showStudentService.execute({ student_id: id });

    return response.json(student);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, document, status } = request.body;

    const updateStudentService = container.resolve(UpdateStudentService);

    const updatedStudent = await updateStudentService.execute({
      student_id: id,
      name,
      status,
      document,
    });

    return response.json(updatedStudent);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeStudentService = container.resolve(RemoveStudentService);

    await removeStudentService.execute({ student_id: id });

    return response.status(204).json();
  }
}
