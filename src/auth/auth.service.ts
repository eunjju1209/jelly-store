import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/model/user.entity';
import { JwtPayload } from '../dto/login.dto';

@Injectable()
export class AuthService {
  // constructor(private readonly usersService: UsersService) {}
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // async validateUser(token: string): Promise<any> {
  //   // validate if token passed along with HTTP request
  //   // is associated with any registered account in the database
  //
  //   // return await this.usersService.findOneByToken(token);
  //   return await this.usersService.findOne(token);
  // }

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
      'Codebrains',
      { expiresIn }
    );

    return {
      expiresIn,
      accessToken
    };
  }

  // 생성된 토큰으로 아이디 찾기
  async validateUserToken(payload: JwtPayload): Promise<User> {

    console.log(`payload ==> ${payload}`);
    return await this.usersService.findById(payload.id);
    // return await this.usersService.findById(pay)
  }
}
