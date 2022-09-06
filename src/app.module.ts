import { join } from 'path';
import { Module } from '@nestjs/common';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';

import { grpcOptions } from '@/common/grpc';

import { HealthModule } from '@/modules/health/health.module';

@Module({
  imports: [
    GrpcReflectionModule.register(
      grpcOptions(join(__dirname, '..', 'proto', 'health.proto')),
    ),
    HealthModule,
  ],
})
export class AppModule {}
