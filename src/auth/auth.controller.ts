import {
  Controller,
  Post, Req, Res, HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { NestJS } from 'nestAppEnv';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  // TODO: use decorator to set jwt cookie
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: NestJS.GuardedRequest, @Res() res: Response): Promise<void> {
    const accessToken = await this.authService.login(req.user);
    res
      .status(HttpStatus.OK)
      .cookie('auth', accessToken, {
        maxAge: 1e3 * 60 * 60 * 12,
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') !== 'development',
      })
      .json(req.user)
      .end();
  }
}
