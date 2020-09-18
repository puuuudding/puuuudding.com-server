import { Request } from '@nestjs/common';
import UserDto from './users/dtos/user.dto';

declare namespace NestJS {
  export interface GuardedRequest extends Request {
    user: UserDto;
  }
}
