import { Request } from '@nestjs/common';
import UserDto from './users/dtos/user.dto';

declare namespace NestJS {
  interface AppRequest extends Request {
    cookies: { [key: string]: string };
  }
  interface GuardedRequest extends AppRequest {
    user: UserDto;
  }
}
