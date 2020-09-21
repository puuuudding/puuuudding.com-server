import {
  Controller,
  Get, Request,
  UseGuards,
} from '@nestjs/common';
import { NestJS } from 'nest-app-env';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getSelfProfile(@Request() req: NestJS.GuardedRequest): UserDto {
    return req.user;
  }
}
