import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as colors from 'colors';
import * as express from 'express';
import { join } from 'path';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  colors.enable();

  const PORT = process.env.PORT || 5000;
  const HOST = process.env.HOST;

  app.use('/api/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    Logger.log(
      'App started on ' + `http://${HOST}:${PORT}`.underline.blue,
      'Server',
    );
  });
}
bootstrap();
