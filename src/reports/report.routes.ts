import { FastifyInstance } from 'fastify';
import { getTopPlayersReport } from './report.service';

export async function reportRoutes(app: FastifyInstance) {
  app.get('/reports/top-players', async (request) => {
    const {
      from,
      to,
      limit,
    } = request.query as {
      from?: string;
      to?: string;
      limit?: string;
    };

    return getTopPlayersReport(
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
      limit ? Number(limit) : 10,
    );
  });
}