import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
//, ConfigService
import { configService } from './config/config.service';
import * as path from 'path';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, AuthService]
})
export default class AppModule {}
