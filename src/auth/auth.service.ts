import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from './entity/user.entity';
import { JwksPayload } from './strategy/jwks.strategy';

export class AuthenticationError extends Error {}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly sessionRepository: EntityRepository<User>,
    private configService: ConfigService,
  ) {}

  async handleUserAuth(payload: JwksPayload) {
    let user = await this.sessionRepository.findOne(payload.sub);

    if (!user) {
      // Create user
      user = this.sessionRepository.create({
        id: payload.sub,
        preferred_username: payload.preferred_username,
      });
      await this.sessionRepository.persistAndFlush(user);
    } else {
      // Update user6
      user.preferred_username = payload.preferred_username;
      await this.sessionRepository.flush();
    }
    return user;
  }
}
