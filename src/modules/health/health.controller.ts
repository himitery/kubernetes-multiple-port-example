import { Controller, Get } from '@nestjs/common';

@Controller('/api/health')
export class HealthController {
  @Get('/')
  health(): boolean {
    return true;
  }
}
