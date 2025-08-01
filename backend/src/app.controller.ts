import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
}

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Welcome message',
    description: 'Returns a welcome message for the Arketic AI Backend API'
  })
  @ApiOkResponse({
    description: 'Welcome message returned successfully',
    schema: {
      type: 'string',
      example: 'Welcome to Arketic AI Backend API! 🚀'
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ 
    summary: 'Health check',
    description: 'Check the health status of the backend API server'
  })
  @ApiOkResponse({
    description: 'Health check performed successfully',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'ok',
          description: 'Server status'
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          example: '2025-08-01T16:40:00.000Z',
          description: 'Current server timestamp'
        },
        uptime: {
          type: 'number',
          example: 123.456,
          description: 'Server uptime in seconds'
        },
        environment: {
          type: 'string',
          example: 'development',
          description: 'Current environment'
        }
      }
    }
  })
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}