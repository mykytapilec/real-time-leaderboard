import { FastifyInstance } from 'fastify';
import { authenticate } from '../auth/auth.middleware';
import {
  getLeaderboard,
  updatePlayerScore,
} from '../services/leaderboard.service';

export async function leaderboardRoutes(app: FastifyInstance) {
  app.post(
    '/players',
    {
      preHandler: authenticate,
    },
    async (request, reply) => {
      const { id, name, score } = request.body as {
        id: string;
        name: string;
        score: number;
      };

      const player = updatePlayerScore(id, name, score);

      return reply.code(201).send(player);
    },
  );

  app.get('/leaderboard', async () => {
    return getLeaderboard();
  });

  app.patch(
    '/players/:id/score',
    {
      preHandler: authenticate,
    },
    async (request, reply) => {
      const { id } = request.params as {
        id: string;
      };

      const { name, score } = request.body as {
        name: string;
        score: number;
      };

      const player = updatePlayerScore(id, name, score);

      return reply.send(player);
    },
  );
}