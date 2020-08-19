import { Body, Controller, Request, Get, Post, Req, UseGuards, HttpStatus, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { toCamel, toSnake } from 'snake-camel';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from '../dto/login.dto';

@Controller('users')
export class UsersController {

  // constructor(private service: UsersService) { }
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }

  // 회원가입
  @Post('signup')
  async signUp(@Req() request:Request, @Body() createUserDto: UserDto) {

    const { userId, password, role } = toCamel(request);

    // 중복 체크 해주기
    const duplicate = await this.duplicate(userId);

    if (duplicate == false) {
      return false;
    }

    const result = await this.userService.create({
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

    return await this.userService.duplicate(userId);
  }

  // 로그인
  @Post('signin')
  async signin(@Response() response, @Body() login: LoginUserDto) {
    // TODO : dto 가기전에 camel 케이스로 먼저 가도록 변경
    const req = toCamel(login);
    const user = await this.userService.findOne(req);

    if (!user) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        messsage: 'User Not Found',
      });
    }

    // token 만들어주기
    const token = await this.authService.createToken(user);
    return response.status(HttpStatus.OK).json(token);
  }

}
