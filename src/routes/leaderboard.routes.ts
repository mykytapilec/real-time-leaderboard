import { FastifyInstance } from 'fastify';
import { leaderboardService } from '../services/leaderboard.service';

export async function leaderboardRoutes(app: FastifyInstance) {
  app.post('/players', async (request, reply) => {
    const player = leaderboardService.addPlayer(request.body as {
      id: string;
      name: string;
      score: number;
    });

    return reply.code(201).send(player);
  });

  app.get('/leaderboard', async () => {
    return leaderboardService.getLeaderboard();
  });

  app.get('/players/:id', async (request, reply) => {
    const { id } = request.params as {
      id: string;
    };

    const player = leaderboardService.getPlayer(id);

    if (!player) {
      return reply.code(404).send({
        message: 'Player not found',
      });
    }

    return player;
  });

  app.patch('/players/:id/score', async (request, reply) => {
    const { id } = request.params as {
      id: string;
    };

    const { score } = request.body as {
      score: number;
    };

    const player = leaderboardService.updateScore(id, score);

    return reply.send(player);
  });
}