import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const port = process.env.PORT || 3000;
  // const host = process.env.HOST || 'localhost';
  await app.listen(3000);
  // await app.listen(port, host);
  // console.log(`Server running on http://${host}:${port}`);
}
bootstrap();
