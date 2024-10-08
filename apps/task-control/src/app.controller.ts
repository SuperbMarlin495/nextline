import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from '@app/entities/task-control.entity';
import { BSON, ReturningStatementNotSupportedError } from 'typeorm';

@Controller('task')
export class AppController {
  constructor(private readonly appService: AppService) {}

  async validateUser(body: number){
    return await this.appService.getUserValidate(body)
  }

    @Get('getAllTask')
    async getAllTasks() {
      return this.appService.getAllTasks();
    }
  
    @Post('create-task')
    async createTask(@Body() data: Partial<Task>) {
      let responseUser = await this.validateUser(data.userId);
      return responseUser? this.appService.createTask(data) : 'El usuario no existe';
    }
  
    @Get('single-task/:id')
    async getTaskById(@Param('id') id: number) {
      return this.appService.getTaskById(id);
    }

    @Post('updateTask')
    async updateTask(@Body() data: Task){
      return this.appService.updateTask(data)
    }

    @Delete('deleteTask/:id')
    async deleteTask(@Param('id') id: number){
      return this.appService.deleteTask(id);
    }
}
