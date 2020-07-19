import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../model/user.entity';

import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  /** for feature 무엇인지 확인해보기
   * 서비스와 컨트롤러 사용할 수 있도록 user 모델을 연결합니다.
   * **/
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
