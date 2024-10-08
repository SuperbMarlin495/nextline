import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '@app/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'new_task' })
  async validUser(id: number): Promise<boolean>{
    let response = await this.userService.getUserById(id)
    return response ? true : false;
  }

  @Get('getAllUser')
  async getAllUser  (){
    return await this.userService.getAllUser();
  }

  @Get('getSingleUser/:id')
  async getSingelUser(@Param('id') id: number){
    return await this.userService.getUserById(id)
  }

  @Post('createUser')
  async createNewUser(@Body() data: Partial<User>){
    return await this.userService.createUser(data);
  }

  @Post('updateUser')
  async updateUser(@Body() data: User){
    return await this.userService.updateUser(data);
  }

  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: number){
    return await this.userService.deleteUser(id)
  }
}
