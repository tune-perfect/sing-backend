import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { Session } from './entity/session.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Session])],
  providers: [SessionService],
  controllers: [SessionController],
})
export class SessionModule {}
