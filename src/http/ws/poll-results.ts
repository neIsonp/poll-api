import { FastifyInstance } from "fastify";
import { request } from "http";
import z, { string } from "zod";
import { voting } from "../utils/voting-pub-sub";

export async function pollResults(app: FastifyInstance) {
  app.get(
    "/polls/:pollId/results",
    { websocket: true },
    (connection, request) => {
      const getPollparams = z.object({
        pollId: z.string().uuid(),
      });

      const { pollId } = getPollparams.parse(request.params);

      voting.subscribe(pollId, (message) => {
        connection.socket.send(JSON.stringify(message));
      });
    }
  );
}
