import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '@app/entities/task-control.entity';

@Injectable()
export class AppService {

  constructor(@Inject('USER_SERVICE') private client: ClientProxy,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) { }

  async getUserValidate(data: number) {
    try {
      const pattern = { cmd: 'new_task' };
      await this.client.connect();
      return this.client.send(pattern, data).toPromise();
    }
    catch (error) {
      console.log(error)
      throw new HttpException('Error al validar el usuario', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async createTask(data: Partial<Task>): Promise<Task> {
    try {
      const newTask = this.taskRepository.create(data);
      return await this.taskRepository.save(newTask);
    }
    catch (error) {
      console.log(error)
      throw new HttpException('Error al crear la tarea', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      return this.taskRepository.find();
    }
    catch (error) {
      console.log(error)
      throw new HttpException('Error al obtener las tareas', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTaskById(id: number): Promise<Task> {
    try {
      return this.taskRepository.findOneBy({ id });
    }
    catch (error) {
      console.log(error)
      throw new HttpException('Error al obtener la tarea', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateTask(data: Partial<Task>): Promise<void>{
    try{
      await this.taskRepository.update(data.id, data)
    }
    catch(error){
      console.log(error)
      throw new HttpException('Error al actualizar la tarea', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteTask(id: number){
    try{
      await this.taskRepository.delete(id);
    }
    catch(error){
      console.log(error)
      throw new HttpException('Error al crear la tarea', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTaskByIdUser(id: number): Promise<Task[]> {
    try {
      return await this.taskRepository.find({ 
        where: {userId: id}
       });
    }
    catch (error) {
      console.log(error)
      throw new HttpException('Error al obtener la tarea', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
