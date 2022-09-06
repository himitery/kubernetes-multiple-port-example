import { Module } from '@nestjs/common';

import { HealthController } from '@/modules/health/health.controller';
import { HealthGrpcController } from '@/modules/health/health.grpc.controller';

@Module({
  controllers: [HealthController, HealthGrpcController],
})
export class HealthModule {}
