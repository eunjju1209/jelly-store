// 엔터티에 접근할 수 있도록 기본적인 인터페이스를 작성한다.

import { EntityRepository, Repository } from 'typeorm';
import { User } from '../model/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
}
