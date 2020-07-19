import {
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Body,
  Response, HttpStatus,
} from '@nestjs/common';
import { AuthService} from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Request } from 'express';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './dto/login.dto';
import {toCamel,toSnake } from 'snake-camel';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Response() response, @Body() login: LoginUserDto) {
    // TODO : dto 가기전에 camel 케이스로 먼저 가도록 변경
    const req = toCamel(login);

    const user = await this.usersService.findOne(req);

    if (!user) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        messsage: 'User Not Found',
      });
    } else {
      // token 만들어주기
      const token = await this.authService.createToken(user);

      // console.log(`token --> ${token}`);
      return response.status(HttpStatus.OK).json(token);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() requset:Request) {
    return requset.user;
  }

}
