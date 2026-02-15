import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Fans CRM API')
    .setDescription('The fans CRM API description')
    .setVersion('1.0')
    .addTag('fans-crm')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  await app.listen(process.env.PORT!);

  Logger.log(
    `🦾 API is running on http://localhost:${process.env.PORT!}/api/v1`,
    'Bootstrap',
  );

  Logger.log(
    `📖 Swagger docs available at http://localhost:${process.env.PORT!}/swagger`,
    'Bootstrap',
  );
}

void bootstrap();
