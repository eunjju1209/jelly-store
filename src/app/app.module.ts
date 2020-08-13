import { Module } from '@nestjs/common';

// dotenv (환경변수) .env 파일로 빼고 활용하기 위해서
// https://github.com/nestjsx/nestjs-config
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AuthModule } from '../auth/auth.module';

// db model
import { User } from '../model/user.entity';
import { UsersModule } from '../users/users.module';
import { BrandModule } from './brand/brand.module';


@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    // TypeOrmModule.forRoot(),
    TypeOrmModule.forRoot({
      'entities': [User]
    }),
    AuthModule,
    UsersModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
