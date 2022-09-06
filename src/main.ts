import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { GrpcOptions } from '@nestjs/microservices';

import { grpcOptions } from '@/common/grpc';

import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<GrpcOptions>(
    grpcOptions(join(__dirname, '..', 'proto', 'health.proto')),
  );

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
