import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import UsersService from 'users/users.service';
import UserDto from 'users/dtos/user.dto';

@Injectable()
export default class AuthService {
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

  async login(user: UserDto) {
    const payload = {
      sub: user.userId,
      username: user.username,
    };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
