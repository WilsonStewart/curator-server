import { db } from "@/db/database";
import { server } from "@/server";
import { FastifyRequest } from "fastify";

server.get(
  "/repository/:id",
  async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
    return await db
      .selectFrom("respositories")
      .where("id", "=", req.params.id)
      .execute();
  }
);
