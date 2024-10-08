import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from '@app/entities/task-control.entity';

@Controller('task')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async validateUser(@Body() body: any){
    return await this.appService.getUserValidate(body)
  }

    // Endpoint para obtener todas las tareas
    @Get()
    async getAllTasks() {
      return this.appService.getAllTasks();
    }
  
    // Endpoint para crear una nueva tarea
    @Post('create-task')
    async createTask(@Body() data: Partial<Task>) {
      return this.appService.createTask(data);
    }
  
    // Endpoint para obtener una tarea por id
    @Get(':id')
    async getTaskById(@Param('id') id: number) {
      return this.appService.getTaskById(id);
    }
}
