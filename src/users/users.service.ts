import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'jone',
        password: 'test'
      }
    ];

  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.name === username);
  }


  // async findOneByToken(token: string): Promise<string> {
  //
  // }
}
