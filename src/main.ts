// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
require('module-alias/register');
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app: INestApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ caseSensitive: false }),
      {
        logger: ['error', 'warn'],
        cors: {
          origin: process.env.APP_CORS_ORIGIN?.split(','),
          credentials: false,
        },
      },
    );
  global.getApp = () => app;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(process.env.APP_GLOBAL_PREFIX);
  await app.listen(
    process.env.APP_LISTEN_PORT || 4000,
    process.env.APP_LISTEN_HOSTNAME || '127.0.0.1',
  );
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Server listening on ${process.env.APP_LISTEN_HOSTNAME}:${process.env.APP_LISTEN_PORT}`,
  );
}
bootstrap();
