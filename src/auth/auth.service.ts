import { Injectable, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { compare } from 'bcryptjs';
import UsersService from 'users/users.service';
import UserDto from 'users/dtos/user.dto';

@Injectable()
export default class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pwd: string): Promise<UserDto | null> {
    const user = await this.usersService.findOne(username);
    if (user && await compare(pwd, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto, res: Response): Promise<void> {
    const payload = {
      sub: user.userId,
      username: user.username,
    };
    const accessToken = this.jwtService.sign(payload);
    res
      .status(HttpStatus.OK)
      .cookie('auth', accessToken, {
        maxAge: 1e3 * 60 * 60 * 12,
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') !== 'development',
      })
      .json(user)
      .end();
  }
}
