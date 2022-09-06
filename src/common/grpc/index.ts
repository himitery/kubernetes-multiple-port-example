import { GrpcOptions, Transport } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcOptions = (protoPath: string): GrpcOptions =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:9000',
      package: 'health',
      protoPath,
    },
  });
