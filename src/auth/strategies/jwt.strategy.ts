import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserDto from '../../users/dtos/user.dto';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
