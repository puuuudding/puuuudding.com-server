import { Request } from '@nestjs/common';
import { UserDto } from './users/dtos/user.dto';

declare module NestJS {
  interface AppRequest extends Request {
    cookies: { readonly [key: string]: string };
  }
  interface GuardedRequest extends AppRequest {
    user: UserDto;
  }
}

declare module Strategies {
  interface JWTPayload {
    sub: number;
    username: string;
  }
}
