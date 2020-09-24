import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Strategies, NestJS } from 'nestAppEnv';
import { UserDto } from 'users/dtos/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ({ cookies }: NestJS.AppRequest) => cookies.auth,
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_STRATEGY_SECRET') as string,
    });
  }

  async validate(payload: Strategies.JWTPayload): Promise<UserDto> {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
