import {
  Controller,
  Get, Request,
  UseGuards,
} from '@nestjs/common';
import { NestJS } from 'nestAppEnv';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getSelfProfile(@Request() req: NestJS.GuardedRequest): UserDto {
    return req.user;
  }
}
