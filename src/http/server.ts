import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { request } from "http";
import { title } from "process";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { createPool } from "./routes/create-pool";

const app = fastify();

app.register(createPool);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running");
});
