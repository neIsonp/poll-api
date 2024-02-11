import {  PrismaClient } from "@prisma/client"
import fastify from "fastify"
import { request } from "http"
import { title } from "process"
import {z} from "zod"

const app = fastify()

const prisma = new PrismaClient()

app.post('/pools', async (request, reply) =>{

  const createPollBody = z.object({
    title: z.string()
  })

  const {title} = createPollBody.parse(request.body)

  const pool = await prisma.pool.create({
    data: {
      title
    }
  })

  return reply.status(201).send({ poolId: pool.id})
})


app.listen({port: 3333}).then(() =>{
  console.log("Server running")
})