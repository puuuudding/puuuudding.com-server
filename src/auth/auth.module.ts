import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import UsersModule from '../users/users.module';
import LocalStrategy from './local.strategy';
import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export default class AuthModule {}
