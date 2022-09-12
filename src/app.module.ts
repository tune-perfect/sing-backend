import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from './config/db.config';
import { SessionModule } from './session/session.module';
import { validate } from './config/env.validation';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({ validate, load: [dbConfig] }),
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
