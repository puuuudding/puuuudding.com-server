import {
  Controller,
  Post, Request, HttpCode, HttpStatus,
  UseGuards,
} from '@nestjs/common';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}