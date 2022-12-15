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
    // search for existing session with same id and generate new id if found
    let session;
    let sessionId;
    let length = 4;
    let tries = 0;
    do {
      sessionId = this.generateSessionId(length);
      session = await this.sessionRepository.findOne({ id: sessionId });
      tries++;
      if (tries > 10) {
        length++;
        tries = 0;
      }
    } while (session);

    const newSession = this.sessionRepository.create({ id: sessionId });
    await this.sessionRepository.persistAndFlush(newSession);
    return newSession;
  }

  async joinSession() {
    console.log('joinSession');
  }

  generateSessionId(length: number) {
    const allowedChars = 'abcdefghjklmnpqrstuvwxyz23456789';
    let sessionId = '';
    for (let i = 0; i < length; i++) {
      sessionId += allowedChars.charAt(
        Math.floor(Math.random() * allowedChars.length),
      );
    }
    return sessionId;
  }
}
