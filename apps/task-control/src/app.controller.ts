import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('task')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async validateUser(@Body() body: any){
    return await this.appService.getUserValidate(body)
  }
}
