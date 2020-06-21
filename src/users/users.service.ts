import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[];

  // constructor(@InjectRepository(User) private readonly repo:Repository<User>) {
  constructor(
      @InjectRepository(User) private readonly userRepository:UserRepository
    ) {
  }

  async findOne(username: string): Promise<User | undefined> {
    // return this.users.find(user => user.name === username);
    return undefined;
  }

  // 회원가입 유저생성
  // async create(user: any): Promise<User | undefined> {
  async create(createUserDto: UserDto) {
    return await this.userRepository.create(createUserDto).save();
  }

  // 중복체크
  async duplicate(userId: string): Promise<boolean> {
    const count = await this.userRepository.count({ userId: userId });
    return count == 0 ? true: false;
  }


  // async findOneByToken(token: string): Promise<string> {
  //
  // }
}
