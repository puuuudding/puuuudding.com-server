import { Injectable } from '@nestjs/common';
import UsersService from '../users/users.service';

@Injectable()
export default class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pwd: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pwd) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
