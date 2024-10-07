import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { get } from 'http';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'new_task' })
  async validUser(data: any): Promise<string>{
    console.log('si llego aqui', data);
    return 'Task creada';
  }

  @Get('saludo')
  async getHola(){
    console.log('SI llego aqui')
    return await this.userService.getHello();
  }
}
