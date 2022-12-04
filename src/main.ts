import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(
      'Бэкэнд сервис приложения для сенсорной панели "Особо охраняемые природные территории"',
    )
    .setDescription('Документация REST API - Files upload')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/upload', app, document);

  await app.listen(PORT, () => {
    console.log(`
      \nServer ready at: http://localhost:${PORT}/graphql for GraphQL\n and at: http://localhost:${PORT}/upload for uploading files
    `);
  });
}

start().catch((er) => console.error(er));
