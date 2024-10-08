import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '@app/entities/task-control.entity';

@Injectable()
export class AppService {

  constructor( @Inject('USER_SERVICE') private client: ClientProxy,  
               @InjectRepository(Task)  private readonly taskRepository: Repository<Task>,
              ){}

  async getUserValidate(data: any){
    const pattern = { cmd: 'new_task' };
    await this.client.connect();
    return this.client.send(pattern, data).toPromise();
  }

  async createTask(data: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(data);
    return await this.taskRepository.save(newTask);
  }

    // Obtener todas las tareas
    async getAllTasks(): Promise<Task[]> {
      return this.taskRepository.find();
    }
  
    // Obtener una tarea por su id
    async getTaskById(id: number): Promise<Task> {
      return this.taskRepository.findOneBy({ id });
    }
}
