import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entity/user.entity';
import { JwksStrategy } from './strategy/jwks.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [HttpModule, MikroOrmModule.forFeature([User]), PassportModule],
  providers: [AuthService, JwksStrategy, JwtStrategy],
})
export class AuthModule {}
