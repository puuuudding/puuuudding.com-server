import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UsersService from '../users/users.service';

@Injectable()
export default class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pwd: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pwd) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
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
