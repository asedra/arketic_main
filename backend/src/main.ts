import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  // Enable CORS for frontend communication
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-frontend-domain.com']
      : ['http://localhost:3000'],
    credentials: true,
  });

  // Global prefix for all routes
  app.setGlobalPrefix('api');

  // Swagger API Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Arketic AI Backend API')
    .setDescription('API documentation for Arketic AI application backend built with NestJS + TypeScript')
    .setVersion('1.0.0')
    .addTag('health', 'Health check endpoints')  
    .addTag('auth', 'Authentication endpoints')
    .addTag('ai', 'AI and LangChain endpoints')
    .addTag('websocket', 'Real-time WebSocket endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .setContact(
      'Arketic Team',
      'https://github.com/arketic',
      'team@arketic.com'
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'Arketic API Documentation',
    customfavIcon: '/favicon.ico',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .scheme-container { background: #1f2937; padding: 10px; border-radius: 5px; }
    `,
  });

  await app.listen(port);
  console.log(`🚀 Arketic Backend is running on: http://localhost:${port}/api`);
  console.log(`📚 API Documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap();