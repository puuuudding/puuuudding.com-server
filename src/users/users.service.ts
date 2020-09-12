import { Injectable } from '@nestjs/common';

export type User = {
  userId: number,
  username: string,
  password: string,
};

@Injectable()
export default class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [{
      userId: 1,
      username: 'sean',
      password: 'password',
    }, {
      userId: 2,
      username: 'pudding',
      password: 'password',
    }];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
