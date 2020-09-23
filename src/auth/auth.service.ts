import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Strategies } from 'nestAppEnv';
import { UsersService } from 'users/users.service';
import { UserDto } from 'users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pwd: string): Promise<UserDto | null> {
    const user = await this.usersService.findOne(username);
    if (user && await compare(pwd, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto): Promise<string> {
    const payload: Strategies.JWTPayload = {
      sub: user.userId,
      username: user.username,
    };
    return this.jwtService.sign(payload);
  }
}
