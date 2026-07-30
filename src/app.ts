import Fastify from 'fastify';
import { leaderboardRoutes } from './routes/leaderboard.routes';

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(leaderboardRoutes);

  app.get('/health', async () => {
    return {
      status: 'ok',
    };
  });

  return app;
}