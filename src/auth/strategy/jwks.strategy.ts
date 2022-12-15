import { AuthService } from '@auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwksPayload {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
}

@Injectable()
export class JwksStrategy extends PassportStrategy(Strategy, 'jwks') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>(
          'keycloak.baseUrl',
        )}realms/${configService.get<string>(
          'keycloak.realm',
        )}/protocol/openid-connect/certs`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      // audience: 'http://localhost:5000/',
      // issuer: 'http://localhost:8180/',
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwksPayload) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.handleUserAuth(payload);

    return user;
  }
}
