import {
  Controller,
  Get, Request,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from '../auth/jwt-auth.guard';

@Controller('users')
export default class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getSelfProfile(@Request() req) {
    return req.user;
  }
}
