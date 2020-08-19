import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configService } from './config/config.service';
import * as path from 'path';
import { AuthService } from './app/auth/auth.service';
import { UsersService } from './app/users/users.service';

import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { BrandModule } from './app/brand/brand.module';
import { BrandService } from './app/brand/brand.service';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule
  ],
  controllers: [
    AppController
  ],
  providers: [AppService, UsersService, AuthService, BrandService]
})
export default class AppModule {}
