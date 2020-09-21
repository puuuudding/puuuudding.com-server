import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { NestJS } from 'nest-app-env';
import { UserDto } from 'users/dtos/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ({ cookies }: NestJS.AppRequest) => cookies.auth,
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_STRATEGY_SECRET'),
    });
  }

  async validate(payload: any): Promise<UserDto> {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
