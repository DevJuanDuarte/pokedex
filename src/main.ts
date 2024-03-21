import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //PREFIJO GLOBAL
  app.setGlobalPrefix('api/v2');

  //Se crea el ValidationPipe incluyendo el whitelist y el forbidWhitelisted
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,

      //Transformar los Dtos
      transform:true,
      transformOptions: {
        enableImplicitConversion:true,
      }
    })
  );

  await app.listen(process.env.PORT);
  console.log(`App running in port ${process.env.PORT}`);
}
bootstrap();
