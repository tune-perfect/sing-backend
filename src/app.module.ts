import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from './config/db.config';
import { SessionModule } from './session/session.module';
import { validate } from './config/env.validation';
import { AuthModule } from './auth/auth.module';
import keycloakConfig from './config/keycloak.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({
      validate,
      load: [dbConfig, keycloakConfig, appConfig],
      isGlobal: true,
    }),
    SessionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
