import { ExecutionContext, Injectable, NestMiddleware, SetMetadata } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

import * as jwt from 'jsonwebtoken';

/**
 * 컨트롤러 실행하기 전에, middleware 에서 token 으로
 * admin 인지 user 인지 판별하는 middleware
*/
@Injectable()
export class GuardMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  use(request: Request, response:Response, next: Function) {
    /**
     * guard 에서 role 역할 작성 안한 부분은
        guard 모든 컨트롤러에서 다 옵저버 형식이라서 로그인때도 실행되기 때문이다.
        로그인 시도할때부터 metadata > role 찾고 실행되기 싫어서
        미들웨어에 권한이 필요한 부분만 모듈에서 import 해서 사용하려고 한다.
     */
      // TODO: token 으로 bearer 제거하는 함수있는지 확인후 수정한다.

    const token = request.header('authorization').split(" ");
    const user = jwt.decode(token[1]);

    const Roles = (...roles: string[]) => SetMetadata('roles', user['role']);

    next();
  }
}
