# Backend API Testing Guide

## Available Endpoints

### HTTP REST API
- **GET** `/api` - Welcome message
- **GET** `/api/health` - Health check

### WebSocket Events
- `ping` - Test connection (returns `pong`)
- `message` - Send/receive messages
- `joinRoom` - Join a chat room
- `leaveRoom` - Leave a chat room
- `roomMessage` - Send message to room
- `getServerStats` - Get server statistics

### API Documentation
- **Swagger UI**: http://localhost:3001/api/docs

## Testing Commands

```bash
# Start the server
npm run start:dev

# Test health endpoint
curl http://localhost:3001/api/health

# Test welcome endpoint
curl http://localhost:3001/api
```

## WebSocket Testing

You can test WebSocket functionality using the browser console or a WebSocket client:

```javascript
const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('ping');
});

socket.on('pong', (data) => {
  console.log('Pong received:', data);
});
```