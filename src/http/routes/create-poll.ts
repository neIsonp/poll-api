import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createPool(app: FastifyInstance) {
  app.post("/polls", async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
      options: z.array(z.string()),
    });

    const { title, options } = createPollBody.parse(request.body);

    const pool = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map((option) => {
              return { title: option };
            }),
          },
        },
      },
    });

    return reply.status(201).send({ poolId: pool.id });
  });
}
