import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor( @Inject('USER_SERVICE') private client: ClientProxy,){}

  async getUserValidate(data: any){
    const pattern = { cmd: 'new_task' };
    await this.client.connect();
    return this.client.send(pattern, data).toPromise();
  }
}
