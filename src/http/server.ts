import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import cookie from "@fastify/cookie";
import { request } from "http";
import { title } from "process";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { createPool } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";

const app = fastify();

app.register(cookie, {
  secret: "nelsonpp",
  hook: "onRequest",
});

app.register(createPool);
app.register(getPoll);
app.register(voteOnPoll);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running");
});
