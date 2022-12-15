import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwksGuard } from '@auth/guard/jwks.guard';
import { SessionService } from './session.service';
import { JwtGuard } from '@auth/guard/jwt.guard';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createSession() {
    await this.sessionService.createSession();
  }

  @UseGuards(JwksGuard)
  @Post('join')
  async joinSession() {
    await this.sessionService.joinSession();
  }
}
