import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { HealthRes } from '@/__codegen__/rpc';

@Controller()
export class HealthGrpcController {
  @GrpcMethod('HealthService', 'HealthCheck')
  healthCheck(): HealthRes {
    return {
      status: true,
    } as HealthRes;
  }
}
