import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// dotenv (환경변수) .env 파일로 빼고 활용하기 위해서
// https://github.com/nestjsx/nestjs-config
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { AuthModule } from './auth/auth.module';

// db model
import { User } from './model/user.entity';
import { UsersModule } from './users/users.module';
import { BrandModule } from './brand/brand.module';
import { JellyModule } from './jelly/jelly.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { GuardMiddleware } from './middleware/guard.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';

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
    JellyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})

/**
 * middle ware 추가할때, 여기서 추가한다.
 * forRoutes Routes jelly 일때만 로거미들웨어 실행된다.
 */
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GuardMiddleware).forRoutes('jelly');
  }
}
