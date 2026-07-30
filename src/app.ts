import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import { leaderboardRoutes } from './routes/leaderboard.routes';
import { addClient } from './websocket/leaderboard.socket';

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  await app.register(websocket);

  app.get('/ws', { websocket: true }, (socket) => {
    addClient(socket);
  });

  await app.register(leaderboardRoutes);

  app.get('/health', async () => {
    return {
      status: 'ok',
    };
  });

  return app;
}