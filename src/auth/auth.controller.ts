import {
  Controller,
  Post, Req, Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { NestJS } from 'nest-app-env';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  // TODO: use decorator to set jwt cookie
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: NestJS.GuardedRequest, @Res() res: Response): Promise<void> {
    return this.authService.login(req.user, res);
  }
}
