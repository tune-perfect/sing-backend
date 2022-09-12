import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Session } from './entity/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: EntityRepository<Session>,
  ) {}

  async createSession() {
    const newSession = this.sessionRepository.create({
      title: 'test',
      author: 'test',
    });
    await this.sessionRepository.persistAndFlush(newSession);
    return newSession;
  }
}
