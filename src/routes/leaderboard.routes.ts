import { FastifyInstance } from 'fastify';
import { authenticate } from '../auth/auth.middleware';
import {
  getLeaderboard,
  getPlayerRank,
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

  app.get('/players/:id/rank', async (request, reply) => {
    const { id } = request.params as {
        id: string;
    };

    const ranking = getPlayerRank(id);

    if (!ranking) {
        return reply.code(404).send({
        message: 'Player not found',
        });
    }

    return ranking;
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