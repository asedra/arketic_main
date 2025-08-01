import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class WebSocketService {
  private server: Server;
  private connectedClients = new Map<string, Socket>();

  setServer(server: Server): void {
    this.server = server;
  }

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, client);

    // Send welcome message to connected client
    client.emit('welcome', {
      message: 'Successfully connected to Arketic Backend',
      clientId: client.id,
      timestamp: new Date().toISOString(),
    });
  }

  handleDisconnection(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  // Broadcast message to all connected clients
  broadcastToAll(event: string, data: any): void {
    if (this.server) {
      this.server.emit(event, data);
    }
  }

  // Send message to specific client
  sendToClient(clientId: string, event: string, data: any): void {
    const client = this.connectedClients.get(clientId);
    if (client) {
      client.emit(event, data);
    }
  }

  // Get connected clients count
  getConnectedClientsCount(): number {
    return this.connectedClients.size;
  }

  // Get all connected client IDs
  getConnectedClientIds(): string[] {
    return Array.from(this.connectedClients.keys());
  }
}