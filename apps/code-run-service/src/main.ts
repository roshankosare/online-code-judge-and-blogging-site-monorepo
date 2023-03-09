
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces';
import { CodeRunServiceModule } from './code-run-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CodeRunServiceModule, {
    transport: Transport.REDIS,
    options:{
      host:"localhost",
      port:6379
    }
  });
  await app.listen();
}
bootstrap();
