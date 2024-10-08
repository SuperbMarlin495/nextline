import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '@app/entities/task-control.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 4000,
        }
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('DB_HOST:', configService.get<string>('DB_HOST'));
        console.log('DB_USERNAME:', configService.get<string>('DB_USERNAME'));
        console.log('DB_PASSWORD:', configService.get<string>('DB_PASSWORD'));
        console.log('DB_DATABASE_task:', configService.get<string>('DB_DATABASE_task'));
      
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),  // Revisa si esta variable está vacía
          password: configService.get<string>('DB_PASSWORD'),  // Revisa si esta variable está vacía
          database: configService.get<string>('DB_DATABASE_task'),
          entities: [Task],
          synchronize: true,
        };

        // type: 'mysql',
        // host: configService.get('DB_HOST'),
        // port: configService.get<number>('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_DATABASE_task'),
        // entities: [Task],
        // synchronize: true,
      }
    }),
    TypeOrmModule.forFeature([Task]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
