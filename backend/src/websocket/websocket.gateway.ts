import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketService } from './websocket.service';

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-frontend-domain.com']
      : ['http://localhost:3000'],
    credentials: true,
  },
  namespace: '/',
})
export class ArketicWebSocketGateway 
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  constructor(private readonly webSocketService: WebSocketService) {}

  afterInit(server: Server): void {
    this.webSocketService.setServer(server);
    console.log('🔌 WebSocket Gateway initialized');
  }

  handleConnection(client: Socket): void {
    this.webSocketService.handleConnection(client);
  }

  handleDisconnect(client: Socket): void {
    this.webSocketService.handleDisconnection(client);
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket): void {
    client.emit('pong', {
      message: 'Server is alive',
      timestamp: new Date().toISOString(),
      clientId: client.id,
    });
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Message from ${client.id}:`, data.message);
    
    // Echo the message back to the client
    client.emit('messageReceived', {
      message: `Echo: ${data.message}`,
      timestamp: new Date().toISOString(),
      from: 'server',
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(data.room);
    client.emit('joinedRoom', {
      room: data.room,
      message: `Successfully joined room: ${data.room}`,
      timestamp: new Date().toISOString(),
    });

    // Notify others in the room
    client.to(data.room).emit('userJoined', {
      clientId: client.id,
      room: data.room,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ): void {
    client.leave(data.room);
    client.emit('leftRoom', {
      room: data.room,
      message: `Successfully left room: ${data.room}`,
      timestamp: new Date().toISOString(),
    });

    // Notify others in the room
    client.to(data.room).emit('userLeft', {
      clientId: client.id,
      room: data.room,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('roomMessage')
  handleRoomMessage(
    @MessageBody() data: { room: string; message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    // Broadcast message to all clients in the room
    this.server.to(data.room).emit('roomMessage', {
      message: data.message,
      from: client.id,
      room: data.room,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('getServerStats')
  handleGetServerStats(@ConnectedSocket() client: Socket): void {
    client.emit('serverStats', {
      connectedClients: this.webSocketService.getConnectedClientsCount(),
      clientIds: this.webSocketService.getConnectedClientIds(),
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }
}