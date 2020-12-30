import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Todo backend')
    .setDescription('The API of the todo backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = parseInt(process.env.PORT, 10) || 3001;

  await app.listen(port, () => console.log(`Server is listening to ${port}`));
}
bootstrap().catch(err => console.error(err))