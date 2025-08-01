import { Module } from '@nestjs/common';
import { ArketicWebSocketGateway } from './websocket.gateway';
import { WebSocketService } from './websocket.service';

@Module({
  providers: [ArketicWebSocketGateway, WebSocketService],
  exports: [WebSocketService],
})
export class WebSocketModule {}