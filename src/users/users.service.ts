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

  async findOne(login) {
    return await this.userRepository.findOneOrFail({ userId: login.userId, password: login.password });
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

  async findById(id: number): Promise<User> {
    console.log(`id ==> ${id}`);
    return await this.userRepository.findOne({ id: id });
  }
}
