import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs'
import { readFileSync } from 'fs';
// import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerFile = readFileSync('./desenvolvmeddocs.json', {encoding:'utf8', flag:'r'});
  //const swaggerData = fs.readFileSync(swaggerFile, {encoding:'utf8', flag:'r'})
  const swaggerDocument = JSON.parse(swaggerFile)

  const swaggerUi = require('swagger-ui-express');
  const desenvolvmedDocumentation = require(swaggerDocument);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(desenvolvmedDocumentation))

  // const config = new DocumentBuilder()
  //   .setTitle('DesenvolvMed')
  //   .setDescription('Backend para o aplicativo DesenvolvMed')
  //   .setVersion('1.1')
  //   .build()

  //   const document = SwaggerModule.createDocument(app, config)

  //   SwaggerModule.setup('/docs', app, document)

  process.env.TZ = '-03:00'

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors()

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
