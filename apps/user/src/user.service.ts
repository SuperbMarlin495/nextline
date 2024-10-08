import { User } from '@app/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)  private readonly userRepository: Repository<User>){}
  
  
  async createUser(data: Partial<User>): Promise<User> {
    try{
      const newUser = this.userRepository.create(data);
      return await this.userRepository.save(newUser);
    }
    catch(error)
    {
      console.log(error);
      throw new HttpException('Error al crear el usuario', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getAllUser(): Promise<User[]>{
    try{
      return this.userRepository.find();
    }
    catch (error){
      console.error('Error al obtener usuarios:', error);
      throw new HttpException('Error al obtener los usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(id: number): Promise<User>{
    try{
      return this.userRepository.findOneBy({id});
    }
    catch (error){
      console.log(error)
      throw new HttpException('Error al obtener el usuario', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateUser(data: User): Promise<void>{
    try{
      await this.userRepository.update(data.id, data);
    }
    catch(error){
      console.log(error)
      throw new HttpException('Error al actulizar el usuario', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteUser(id: number): Promise<void>{
    try{
        await this.userRepository.delete(id);
    }
    catch(error){
      console.log(error);
      throw new HttpException('Error al eliminar el usuario', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
