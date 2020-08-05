import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/model/user.entity';
import { JwtPayload } from 'src/dto/login.dto';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  // constructor(private readonly usersService: UsersService) {}
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    console.log(`----------------------`);
    console.log(user);
    const payload = { username: user.username, sub:user.userId  };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // 토큰 생성
  async createToken(user: User) {

    // token 만료시간
    const expiresIn = 3600;

    const accessToken = jwt.sign(
      {
        id: user.id,
        userId: user.userId
      },
      jwtConstants.secret,
      { expiresIn }
    );

    return {
      expiresIn,
      accessToken
    };
  }

  // 생성된 토큰으로 아이디 찾기
  async validateUserToken(payload: JwtPayload): Promise<User> {
    return await this.usersService.findById(payload.id);
  }
}
