import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
    {
      cors: true,
    },
  );

  app.useLogger(app.get(Logger));

  app.useBodyParser('json', {
    bodyLimit: 50 * 1000 * 1024,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000, process.env.HOST || '127.0.0.1');
}
bootstrap();
