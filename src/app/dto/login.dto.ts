
export class LoginUserDto {
  // user id
  readonly user_id: string;

  // password
  readonly password: string;
}

// jwt payload
export class JwtPayload {
  id: number;
  userId: string;
}
