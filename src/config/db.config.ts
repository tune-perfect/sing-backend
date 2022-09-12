import { Options } from '@mikro-orm/core';
import { registerAs } from '@nestjs/config';

export default registerAs('database', (): Options => {
  return {
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    type: 'postgresql',
    migrations: {
      path: 'dist/migrations',
      pathTs: 'src/migrations',
    },
  };
});
