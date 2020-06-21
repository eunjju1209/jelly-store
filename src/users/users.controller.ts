import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {toCamel, toSnake } from 'snake-camel';
import { User } from '../model/user.entity';
import { UsersService } from '../users/users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {

  // constructor(private service: UsersService) { }
  constructor(private readonly service: UsersService) { }

  @Get('users')
  @UseGuards(AuthGuard('local'))
    findAll() {
    return []
  }

  /* 회원가입
  @Post('signup')
  signUp(@Req() request: Request, createUserDto: UserDto): boolean {

    // snake case to camel case convert
    const { userId, password, role } = toCamel(request.query);
    // 값 validate 체크

    // UsersService.create({ userId: userId, password: password, role: role });
    // this.service.create({ userId: userId, password: password, role: role });
    this.service.create({
      "userId": userId,
      "password": password,
      "role": {
        'type': 'user'
      }
    });


    return true;
  }
   */

  // 회원가입
  @Post('signup')
  async signUp(@Req() request:Request, @Body() createUserDto: UserDto) {

    const { userId, password, role } = toCamel(request.query);

    // 중복 체크 해주기
    const duplicate = await this.duplicate(userId);

    if (duplicate == false) {
      return false;
    }

    const result = await this.service.create({
      userId: userId,
      password: password,
      role: {
        type: role
      }
    });

    return true;
  }

  // 중복체크
  async duplicate(userId: string)  {
    if (userId.length < 1) {
      return false;
    }

    return await this.service.duplicate(userId);
  }

  // 로그인
  @Post('signin')
  signin() {
    return true;
  }

}
