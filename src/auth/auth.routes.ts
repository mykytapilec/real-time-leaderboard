import { FastifyInstance } from 'fastify';
import { loginUser, registerUser } from './auth.service';

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/register', async (request, reply) => {
    try {
      const user = await registerUser(request.body as {
        username: string;
        password: string;
      });

      return reply.code(201).send(user);
    } catch (error) {
      return reply.code(400).send({
        message: (error as Error).message,
      });
    }
  });

  app.post('/auth/login', async (request, reply) => {
    try {
      const user = await loginUser(request.body as {
        username: string;
        password: string;
      });

      const token = await app.jwt.sign({
        id: user.id,
        username: user.username,
      });

      return reply.send({
        token,
      });
    } catch (error) {
      return reply.code(401).send({
        message: (error as Error).message,
      });
    }
  });
}