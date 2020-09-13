import {
  Controller,
  Get, Request,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import UserDto from './dtos/user.dto';

@Controller('users')
export default class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getSelfProfile(@Request() req): UserDto {
    return req.user;
  }
}
