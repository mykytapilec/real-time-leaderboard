import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import jwt from './plugins/jwt';
import { leaderboardRoutes } from './routes/leaderboard.routes';
import { addClient } from './websocket/leaderboard.socket';

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(jwt);

  app.register(websocket);

  app.get('/ws', { websocket: true }, (socket) => {
    addClient(socket);
  });

  app.register(leaderboardRoutes);

  app.get('/health', async () => {
    return {
      status: 'ok',
    };
  });

  return app;
}