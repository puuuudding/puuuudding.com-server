import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { UserDto } from 'users/dtos/user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDto> {
    const user = await this.authService.validateUser(username, password);
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
