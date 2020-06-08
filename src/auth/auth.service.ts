import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  // constructor(private readonly usersService: UsersService) {}
  constructor(private usersService: UsersService) {}

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
}
