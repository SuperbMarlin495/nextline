import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'new_task' })
  async validUser(data: any): Promise<string>{
    console.log('si llego aqui', data);
    return 'Task creada';
  }
}
