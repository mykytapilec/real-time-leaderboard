import { FastifyInstance } from 'fastify';
import {
  getLeaderboard,
  updatePlayerScore,
} from '../services/leaderboard.service';

export async function leaderboardRoutes(app: FastifyInstance) {
  app.post('/players', async (request, reply) => {
    const player = request.body as {
      id: string;
      name: string;
      score: number;
    };

    const result = updatePlayerScore(
      player.id,
      player.name,
      player.score,
    );

    return reply.code(201).send(result);
  });

  app.get('/leaderboard', async () => {
    return getLeaderboard();
  });

  app.patch('/players/:id/score', async (request, reply) => {
    const { id } = request.params as {
      id: string;
    };

    const { name, score } = request.body as {
      name: string;
      score: number;
    };

    const player = updatePlayerScore(id, name, score);

    return reply.send(player);
  });
}