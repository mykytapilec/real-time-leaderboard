import { WebSocket } from 'ws';

const clients = new Set<WebSocket>();

export function addClient(socket: WebSocket) {
  clients.add(socket);

  socket.on('close', () => {
    clients.delete(socket);
  });

  socket.send(
    JSON.stringify({
      event: 'connected',
      data: {
        message: 'Connected to leaderboard websocket',
      },
    }),
  );
}

export function broadcast(event: string, data: unknown) {
  const message = JSON.stringify({
    event,
    data,
  });

  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
}