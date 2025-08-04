import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocketModule } from './websocket/websocket.module';
import { DatabaseModule } from './database/database.module';
import { AIModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    WebSocketModule,
    AIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}