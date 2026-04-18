import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health Check')
@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Returns a simple greeting to verify the API is online' })
  getHello(): string {
    return this.appService.getHello();
  }

}
