import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import { authRoutes } from './auth/auth.routes';
import jwtPlugin from './plugins/jwt';
import { leaderboardRoutes } from './routes/leaderboard.routes';
import { addClient } from './websocket/leaderboard.socket';

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(jwtPlugin);

  app.register(websocket);

  app.get('/ws', { websocket: true }, (socket) => {
    addClient(socket);
  });

  app.register(authRoutes);
  app.register(leaderboardRoutes);

  app.get('/health', async () => {
    return {
      status: 'ok',
    };
  });

  return app;
}