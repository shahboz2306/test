import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
// import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3001;
    const corsOptions: CorsOptions = { 
      origin: true, // Allow all origins
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'], // Allow only GET and POST requests
      credentials: true, // Allow sending cookies from the client
    };
  
    app.enableCors(corsOptions);
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    const config = new DocumentBuilder()
      .setTitle('MyTest')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addBearerAuth()
      .addTag('NestJS, Postgres')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);
    await app.listen(PORT, () => {
      console.log('Server listening on port', PORT);
    });
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}
bootstrap();
